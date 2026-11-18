"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import { Container } from "../Container";
import { ProjectMedia } from "../ProjectMedia";
import { BoardSticker } from "./BoardSticker";
import { PlaygroundLightbox } from "./PlaygroundLightbox";
import type {
  BoardSpot,
  PlaygroundDecal,
  PlaygroundItem,
  PlaygroundSticker,
} from "@/types/playground";

/**
 * Where a visitor's arrangement is kept. Bump the version whenever the default
 * layout changes enough that old arrangements should be dropped.
 */
const STORAGE_KEY = "playground-board-v3";
/** Pointer travel (px) before a press counts as a drag rather than a click. */
const DRAG_THRESHOLD = 5;
/** How far an arrow key moves a focused piece, as a fraction of the board. */
const NUDGE = 0.02;
/**
 * How close to the left or right side (fraction of the board's width) the
 * pointer has to come before a peeker moves onto that side edge.
 */
const SIDE_ZONE = 0.08;

type Variant = "wide" | "narrow";
/** Which edge a peeker is on. Everything else has no edge. */
type Edge = "bottom" | "left" | "right";
type Point = { x: number; y: number; edge?: Edge };
type Arrangement = Record<Variant, Record<string, Point>>;

type Entry =
  | { kind: "piece"; id: string; item: PlaygroundItem; index: number }
  | { kind: "sticker"; id: string; sticker: PlaygroundSticker }
  | { kind: "decal"; id: string; decal: PlaygroundDecal };

type Drag = {
  id: string;
  pointerId: number;
  startX: number;
  startY: number;
  from: Point;
  board: DOMRect;
  /** Half the item's size as a fraction of the board, for keeping it inside. */
  halfW: number;
  halfH: number;
  peek: boolean;
  /** Whether this peeker has a side version, so it may leave the bottom. */
  side: boolean;
  /** Where along the item it was grabbed, so it does not jump to the pointer. */
  grabX: number;
  moved: boolean;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

/** Matches the md breakpoint, where the board turns from portrait to landscape. */
const currentVariant = (): Variant =>
  window.matchMedia("(min-width: 768px)").matches ? "wide" : "narrow";

/** A loose fallback scatter for anything added without a spot in the layout. */
function autoSpot(index: number, variant: Variant): BoardSpot {
  const cols = variant === "wide" ? 4 : 2;
  return {
    x: (0.5 + (index % cols)) / cols,
    y: 0.2 + 0.25 * Math.floor(index / cols),
    rotate: index % 2 ? 2 : -2,
  };
}

function readSaved(): Partial<Arrangement> & { order?: string[] } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeSaved(arrangement: Arrangement, order: string[]) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...arrangement, order })
    );
  } catch {
    /* private mode or storage blocked: the board still works, just forgets */
  }
}

type Opened = { index: number; rect: DOMRect | null };

/**
 * The playground as a board: the pieces sit scattered at a tilt like polaroids
 * dropped on a table, with animated characters drifting among them. Anything
 * can be picked up and dragged anywhere; where a visitor leaves things is
 * remembered in their browser, and "Tidy up" puts everything back.
 *
 * Positions are fractions of the board, so an arrangement survives resizing.
 * The board is landscape on desktop and portrait on phones, and each shape
 * keeps its own arrangement: a layout made for one does not fit the other.
 * Both default layouts are rendered as CSS variables and the breakpoint picks
 * between them, so the server render is already right for either screen.
 *
 * A press that travels less than a few pixels is still a click, and opens the
 * piece; arrow keys move a focused piece for keyboard visitors.
 */
export function PlaygroundBoard({
  items,
  stickers,
  decals = [],
  layout,
}: {
  items: PlaygroundItem[];
  stickers: PlaygroundSticker[];
  decals?: PlaygroundDecal[];
  layout: Record<Variant, Record<string, BoardSpot>>;
}) {
  const entries: Entry[] = [
    ...items.map(
      (item, index): Entry => ({ kind: "piece", id: item.id, item, index })
    ),
    ...stickers.map(
      (sticker): Entry => ({ kind: "sticker", id: sticker.id, sticker })
    ),
    ...decals.map((decal): Entry => ({ kind: "decal", id: decal.id, decal })),
  ];

  const spotOf = (id: string, index: number, variant: Variant) =>
    layout[variant][id] ?? autoSpot(index, variant);

  const defaults = (): Arrangement => {
    const make = (variant: Variant) =>
      Object.fromEntries(
        entries.map(({ id }, index) => {
          const { x, y, edge } = spotOf(id, index, variant);
          return [id, { x, y, edge }];
        })
      );
    return { wide: make("wide"), narrow: make("narrow") };
  };

  const boardRef = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  /** Set when a drag ends, to swallow the click the browser fires after it. */
  const swallowClick = useRef(false);

  const [arrangement, setArrangement] = useState<Arrangement>(defaults);
  const [order, setOrder] = useState<string[]>(() => entries.map((e) => e.id));
  const [dragging, setDragging] = useState<string | null>(null);
  const [tidying, setTidying] = useState(false);
  const [opened, setOpened] = useState<Opened | null>(null);
  // Which board shape is showing. Only a peeker's edge depends on it while
  // rendering; it starts "wide" on the server, where every edge is "bottom"
  // in both shapes anyway, so the first render matches.
  const [variant, setVariant] = useState<Variant>("wide");

  useLayoutEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setVariant(query.matches ? "wide" : "narrow");
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Restore a returning visitor's arrangement before the first paint, so the
  // board does not visibly jump from the defaults. Ids that no longer exist
  // are dropped and new ones keep their default spot.
  useLayoutEffect(() => {
    const saved = readSaved();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser storage, which the server render cannot see
    setArrangement((current) => ({
      wide: { ...current.wide, ...pick(saved.wide, current.wide) },
      narrow: { ...current.narrow, ...pick(saved.narrow, current.narrow) },
    }));
    if (saved.order) {
      setOrder((current) => [
        ...current.filter((id) => !saved.order!.includes(id)),
        ...saved.order!.filter((id) => current.includes(id)),
      ]);
    }
  }, []);

  const bringToFront = useCallback((id: string) => {
    setOrder((current) =>
      current[current.length - 1] === id
        ? current
        : [...current.filter((other) => other !== id), id]
    );
  }, []);

  const save = (next: Arrangement, nextOrder = order) => {
    writeSaved(next, nextOrder);
  };

  const onPointerDown = (
    event: PointerEvent<HTMLElement>,
    id: string,
    peek: boolean,
    side: boolean
  ) => {
    if (event.button !== 0 || !boardRef.current) return;
    const board = boardRef.current.getBoundingClientRect();
    const box = event.currentTarget.getBoundingClientRect();
    const variant = currentVariant();
    const from = arrangement[variant][id];
    drag.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      from,
      board,
      halfW: box.width / 2 / board.width,
      halfH: box.height / 2 / board.height,
      peek,
      side,
      grabX:
        (event.clientX - board.left) / board.width -
        ((from.edge ?? "bottom") === "bottom" ? from.x : 0.5),
      moved: false,
    };
    // A fresh press: forget any drag that ended without a click following it.
    swallowClick.current = false;
    bringToFront(id);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d || d.pointerId !== event.pointerId) return;
    const dx = event.clientX - d.startX;
    const dy = event.clientY - d.startY;
    if (!d.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      d.moved = true;
      setDragging(d.id);
      // Captured only once it is a drag. Capturing on press would retarget
      // the click to this wrapper, and the polaroid's button would never get
      // it, so a plain click could not open the piece.
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const variant = currentVariant();
    let point: Point;
    if (d.peek) {
      // A peeker follows the pointer along the bottom edge, and hops onto a
      // side edge when the pointer comes close to that side.
      const px = (event.clientX - d.board.left) / d.board.width;
      const py = (event.clientY - d.board.top) / d.board.height;
      const edge: Edge =
        d.side && px < SIDE_ZONE
          ? "left"
          : d.side && px > 1 - SIDE_ZONE
            ? "right"
            : "bottom";
      point =
        edge === "bottom"
          ? { x: clamp(px - d.grabX, d.halfW, 1 - d.halfW), y: d.from.y, edge }
          : { x: d.from.x, y: clamp(py, d.halfH, 1 - d.halfH), edge };
    } else {
      point = {
        x: clamp(d.from.x + dx / d.board.width, d.halfW, 1 - d.halfW),
        y: clamp(d.from.y + dy / d.board.height, d.halfH, 1 - d.halfH),
      };
    }
    setArrangement((current) => ({
      ...current,
      [variant]: { ...current[variant], [d.id]: point },
    }));
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d || d.pointerId !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (d.moved) {
      swallowClick.current = true;
      setDragging(null);
    }
    // Saved on release rather than on every move. The handlers are rebuilt
    // each render, so these are the values from the last move and press.
    save(arrangement, order);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>, id: string) => {
    const step = event.shiftKey ? NUDGE * 3 : NUDGE;
    const moves: Record<string, Point> = {
      ArrowLeft: { x: -step, y: 0 },
      ArrowRight: { x: step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const variant = currentVariant();
    bringToFront(id);
    setArrangement((current) => {
      const at = current[variant][id];
      const next = {
        ...current,
        [variant]: {
          ...current[variant],
          [id]: { x: clamp(at.x + move.x, 0, 1), y: clamp(at.y + move.y, 0, 1) },
        },
      };
      save(next);
      return next;
    });
  };

  const tidyUp = () => {
    const next = defaults();
    const nextOrder = entries.map((e) => e.id);
    setTidying(true);
    setArrangement(next);
    setOrder(nextOrder);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* nothing saved to clear */
    }
    window.setTimeout(() => setTidying(false), 650);
  };

  const step = (by: number) =>
    setOpened((current) =>
      current === null
        ? null
        : {
            index: (current.index + by + items.length) % items.length,
            rect: null,
          }
    );

  if (entries.length === 0) return null;

  return (
    <Container className="max-w-6xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-meta text-subtle font-semibold">
          Drag anything around or Click a photo to open it!
        </p>
        <button
          type="button"
          onClick={tidyUp}
          // Grows on hover by scaling, not font size, so nothing beside it shifts.
          className="nav-link text-meta text-muted hover:text-ink ease-standard mr-3 origin-right cursor-pointer font-semibold transition-[color,scale] duration-200 hover:scale-115 motion-reduce:hover:scale-100 md:mr-5"
        >
          Tidy up
        </button>
      </div>

      <div
        ref={boardRef}
        className="playground-board rounded-panel relative aspect-3/5 w-full overflow-hidden md:aspect-16/10"
      >
        {entries.map((entry, index) => {
          const wide = spotOf(entry.id, index, "wide");
          const narrow = spotOf(entry.id, index, "narrow");
          const peek = entry.kind === "sticker" && entry.sticker.behaviour === "peek";
          const edge: Edge = (peek && arrangement[variant][entry.id].edge) || "bottom";
          const isDragging = dragging === entry.id;
          const style = {
            "--xw": arrangement.wide[entry.id].x,
            "--yw": arrangement.wide[entry.id].y,
            "--rw": `${wide.rotate}deg`,
            "--xn": arrangement.narrow[entry.id].x,
            "--yn": arrangement.narrow[entry.id].y,
            "--rn": `${narrow.rotate}deg`,
            zIndex: order.indexOf(entry.id) + 1,
          } as CSSProperties;

          const handlers = {
            onPointerDown: (event: PointerEvent<HTMLElement>) =>
              onPointerDown(
                event,
                entry.id,
                peek,
                entry.kind === "sticker" && Boolean(entry.sticker.side)
              ),
            onPointerMove,
            onPointerUp,
            onPointerCancel: onPointerUp,
            onDragStart: (event: { preventDefault: () => void }) =>
              event.preventDefault(),
          };

          const placement = `board-item ${peek ? `board-item--edge-${edge}` : ""} ${
            tidying ? "board-item--tidying" : ""
          } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`;

          if (entry.kind === "decal") {
            const { decal } = entry;
            return (
              <div
                key={entry.id}
                style={style}
                className={`${placement} w-[24%] md:w-[11%]`}
                {...handlers}
              >
                {/* Lifts at a corner while held and lays flat when dropped;
                    see .decal in globals.css. */}
                <div className={`decal ${isDragging ? "decal--lifted" : ""}`}>
                  <Image
                    src={decal.src}
                    alt={decal.label}
                    width={decal.width}
                    height={decal.height}
                    draggable={false}
                    sizes="(min-width: 768px) 130px, 25vw"
                    className="block h-auto w-full"
                  />
                </div>
              </div>
            );
          }

          if (entry.kind === "sticker") {
            return (
              <div
                key={entry.id}
                style={style}
                className={`${placement} w-[30%] md:w-[16%]`}
                {...handlers}
              >
                <div
                  className={`ease-standard transition-transform duration-200 ${
                    isDragging ? "scale-105" : ""
                  }`}
                >
                  <div
                    // The side clip peeks in from the left; the right edge
                    // shows it mirrored.
                    className={
                      peek ? (edge === "right" ? "-scale-x-100" : "") : "board-float"
                    }
                    style={{ animationDelay: `${-index * 1.7}s` }}
                  >
                    {/* Keyed on bottom vs side, so switching edges remounts
                        the clip and it peeks in afresh. */}
                    <BoardSticker
                      key={edge === "bottom" ? "bottom" : "side"}
                      sticker={entry.sticker}
                      clip={
                        edge !== "bottom" && entry.sticker.side
                          ? entry.sticker.side
                          : entry.sticker
                      }
                    />
                  </div>
                </div>
              </div>
            );
          }

          const { item } = entry;
          return (
            <div
              key={entry.id}
              style={style}
              className={`${placement} w-[42%] md:w-[24%]`}
              {...handlers}
            >
              <button
                type="button"
                // The title is not printed on the polaroid, so it names the
                // button; the description tells keyboard visitors they can move it.
                aria-label={`${item.title}. Press Enter to open, arrow keys to move.`}
                onKeyDown={(event) => onKeyDown(event, entry.id)}
                onClick={(event) => {
                  if (swallowClick.current) {
                    swallowClick.current = false;
                    return;
                  }
                  const tile = event.currentTarget.querySelector("[data-tile-media]");
                  setOpened({
                    index: entry.index,
                    rect: tile?.getBoundingClientRect() ?? null,
                  });
                }}
                // A polaroid: a white frame that is thin on three sides and deep
                // along the bottom, left blank. Padding is a percentage of the
                // tile's width, so the proportions hold at every size.
                className={`polaroid ease-standard flex w-full cursor-[inherit] flex-col rounded-[2px] bg-[#fdfdfb] px-[4.5%] pt-[4.5%] pb-[17%] text-left transition-[transform,box-shadow] duration-200 ${
                  isDragging ? "polaroid--lifted scale-[1.04]" : "hover:-translate-y-1"
                }`}
              >
                {/* A plain wrapper, so the box measured for the open flight is
                    the photo itself rather than the frame around it. */}
                <span data-tile-media className="block">
                  <ProjectMedia
                    as="span"
                    thumbnail={item.thumbnail}
                    videoUrl={item.hoverVideoUrl ?? (item.media?.kind === "video" ? item.media.src : undefined)}
                    alt={item.title}
                    aspect="1 / 1"
                    sizes="(min-width: 768px) 280px, 45vw"
                  />
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {opened !== null ? (
        <PlaygroundLightbox
          item={items[opened.index]}
          originRect={opened.rect}
          onClose={() => setOpened(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      ) : null}
    </Container>
  );
}

/** The saved points that still belong to something on the board. */
function pick(
  saved: Record<string, Point> | undefined,
  current: Record<string, Point>
) {
  if (!saved) return {};
  return Object.fromEntries(
    Object.entries(saved).filter(
      ([id, point]) =>
        id in current &&
        typeof point?.x === "number" &&
        typeof point?.y === "number"
    )
  );
}
