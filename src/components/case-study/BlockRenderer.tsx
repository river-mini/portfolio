import { FactSheet } from "./FactSheet";
import { MediaFigure } from "./MediaFigure";
import { MediaPair } from "./MediaPair";
import { TextBlock } from "./TextBlock";
import type { CaseStudyBlock } from "@/types/case-study";

/**
 * Maps a content block to its component. Adding a new block type means adding
 * a variant in src/types/case-study.ts and a case here -- nothing else changes.
 */
export function BlockRenderer({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "text":
      return <TextBlock heading={block.heading} paragraphs={block.paragraphs} />;
    case "factSheet":
      return <FactSheet items={block.items} />;
    case "media":
      return <MediaFigure media={block.media} />;
    case "mediaPair":
      return <MediaPair media={block.media} />;
  }
}
