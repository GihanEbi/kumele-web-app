import React from "react";

type InlineSvgProps = {
  svg: string;
  className?: string; // e.g. "w-5 h-5 text-red-500"
  title?: string;
};

// Converts hardcoded black fills/strokes to currentColor and injects a style
function colorizeSvg(svg: string) {
  let s = svg
    .replace(/fill\s*=\s*"(?:#000000|#000|black)"/gi, 'fill="currentColor"')
    .replace(/stroke\s*=\s*"(?:#000000|#000|black)"/gi, 'stroke="currentColor"');

  const hasViewBox = /viewBox\s*=\s*"/i.test(s);
  const hasClipPath = /clipPath/i.test(s);

  // only strip width/height if it's safe
  if (hasViewBox && !hasClipPath) {
    s = s.replace(/\s(width|height)="[^"]*"/gi, "");
  }

  // inject styling and make svg scale with parent
  s = s.replace(
    /<svg\b([^>]*)>/i,
    `<svg $1 class="w-full h-full"><style>
      :root { color: inherit; }
      path, rect, circle, ellipse, polygon, polyline, line {
        fill: currentColor !important;
        stroke: currentColor !important;
      }
    </style>`
  );

  return s;
}

const InlineSvg: React.FC<InlineSvgProps> = ({ svg, className, title }) => {
  const processed = React.useMemo(() => colorizeSvg(svg), [svg]);

  return (
    <span
      className={`inline-flex items-center justify-center ${className ?? ""}`}
      role="img"
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
};

export default InlineSvg;
