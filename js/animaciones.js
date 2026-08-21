
const div = document.querySelector('.buscador');
document.addEventListener('mousemove', (e) => {
  const rect = div.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const w = rect.width;
  const h = rect.height;
  let borderX, borderY;
  const distTop = mouseY;
  const distBottom = h - mouseY;
  const distLeft = mouseX;
  const distRight = w - mouseX;
  const minDist = Math.min(distTop, distBottom, distLeft, distRight);
  if (minDist === distTop) {
    borderX = Math.min(w, Math.max(0, mouseX));
    borderY = 0;
  } else if (minDist === distBottom) {
    borderX = Math.min(w, Math.max(0, mouseX));
    borderY = h;
  } else if (minDist === distLeft) {
    borderX = 0;
    borderY = Math.min(h, Math.max(0, mouseY));
  } else {
    borderX = w;
    borderY = Math.min(h, Math.max(0, mouseY));
  }
  div.style.setProperty('--mouse-x', `${borderX}px`);
  div.style.setProperty('--mouse-y', `${borderY}px`);
});
