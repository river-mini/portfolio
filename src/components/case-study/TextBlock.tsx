export function TextBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-body-lg text-muted max-w-[62ch]">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
