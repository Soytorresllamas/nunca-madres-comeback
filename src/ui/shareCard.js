import html2canvas from 'html2canvas';

function waitForImages(node) {
  const imgs = [...node.querySelectorAll('img')];
  return Promise.all(
    imgs.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    }),
  );
}

export async function rasterizeToPng(node) {
  await waitForImages(node);
  const canvas = await html2canvas(node, { backgroundColor: null, scale: 2, useCORS: true });
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}
