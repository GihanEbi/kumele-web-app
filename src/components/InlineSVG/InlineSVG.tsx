import React from "react";

type InlineSvgProps = {
  svg: string;
  className?: string; // e.g. "text-app-icon"
  title?: string;
};

// Converts hardcoded black fills/strokes to currentColor and injects a style
function colorizeSvg(svg: string) {
  let s = svg
    .replace(/fill\s*=\s*"(?:#000000|#000|black)"/gi, 'fill="currentColor"')
    .replace(/stroke\s*=\s*"(?:#000000|#000|black)"/gi, 'stroke="currentColor"');

  s = s.replace(
    /<svg\b([^>]*)>/i,
    `<svg $1><style>
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
      className={className}
      role="img"
      aria-label={title}
      // If your API is untrusted, sanitize before injecting.
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
};

export default InlineSvg;
