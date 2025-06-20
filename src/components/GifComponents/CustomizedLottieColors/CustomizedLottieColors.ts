// utils/customizeLottieColors.ts
export function customizeLottieColors(
  animationData: any,
  newColor : any// default to red
) {
  const rgba = hexToRgbArray(newColor); // [1, 0, 0, 1] for red

  const updated = JSON.parse(JSON.stringify(animationData)); // deep clone

  updated.layers.forEach((layer: any) => {
    if (!layer.shapes) return;
    layer.shapes.forEach((shape: any) => {
      if (shape.it) {
        shape.it.forEach((item: any) => {
          if (item.ty === "fl") {
            item.c.k = rgba; // change fill color
          }
        });
      }
    });
  });

  return updated;
}

function hexToRgbArray(hex: string): [number, number, number, number] {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return [
    ((bigint >> 16) & 255) / 255,
    ((bigint >> 8) & 255) / 255,
    (bigint & 255) / 255,
    1,
  ];
}
