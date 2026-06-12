import html2canvas from 'html2canvas';

export async function rasterizeToPng(node) {
  const canvas = await html2canvas(node, { backgroundColor: null, scale: 2 });
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}
