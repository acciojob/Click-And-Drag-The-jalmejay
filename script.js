const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');


let containerRect = container.getBoundingClientRect();
const positions = Array.from(items).map(item => {
  const rect = item.getBoundingClientRect();
  return {
    left: rect.left - containerRect.left,
    top: rect.top - containerRect.top
  };
});

// Convert items to absolutely positioned
items.forEach((item, index) => {
  item.style.position = 'absolute';
  item.style.left = `${positions[index].left}px`;
  item.style.top = `${positions[index].top}px`;
});

// Dragging logic
let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {
  item.addEventListener('mousedown', e => {
    selectedItem = item;
    containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;
    item.style.zIndex = '1000'; // bring to front
    e.preventDefault();
  });
});

document.addEventListener('mousemove', e => {
  if (!selectedItem) return;

  // calculate new position
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  const itemWidth = selectedItem.offsetWidth;
  const itemHeight = selectedItem.offsetHeight;

  // keep within bounds
  newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - itemWidth));
  newTop = Math.max(0, Math.min(newTop, container.clientHeight - itemHeight));

  selectedItem.style.left = `${newLeft}px`;
  selectedItem.style.top = `${newTop}px`;
});

document.addEventListener('mouseup', () => {
  if (selectedItem) {
    selectedItem.style.zIndex = ''; 
    selectedItem = null;
  }
});
