// Your code here.
const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let selected = null;
let offsetX = 0;
let offsetY = 0;
let zIndexCounter = 1;

cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {
    selected = cube;

    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
	  
    cube.style.position = "absolute";
    cube.style.left = (rect.left - containerRect.left) + "px";
    cube.style.top = (rect.top - containerRect.top) + "px";

    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;
    cube.style.zIndex = ++zIndexCounter;
    e.preventDefault();
  });
});


document.addEventListener("mousemove", (e) => {
  if (!selected) return;

  const containerRect = container.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - selected.offsetWidth));
  newTop = Math.max(0, Math.min(newTop, container.clientHeight - selected.offsetHeight));

  selected.style.left = newLeft + "px";
  selected.style.top = newTop + "px";
});

document.addEventListener("mouseup", () => {
  selected = null;
});

