const container = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX;
  scrollLeft = container.scrollLeft;
});

document.addEventListener('mouseup', () => {
  isDown = false;
});

document.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const walk = e.pageX - startX;
  container.scrollLeft = scrollLeft - walk;
});
