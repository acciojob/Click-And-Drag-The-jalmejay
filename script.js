const cubes = document.querySelectorAll('.cube');
const container = document.querySelector('.container');

cubes.forEach(cube => {
    cube.addEventListener('mousedown', function (e) {
        const offsetX = e.clientX - cube.getBoundingClientRect().left;
        const offsetY = e.clientY - cube.getBoundingClientRect().top;

        function mouseMoveHandler(e) {
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Boundary conditions
            const containerRect = container.getBoundingClientRect();
            const cubeRect = cube.getBoundingClientRect();

            if (newX < containerRect.left) newX = containerRect.left;
            if (newY < containerRect.top) newY = containerRect.top;
            if (newX + cubeRect.width > containerRect.right) newX = containerRect.right - cubeRect.width;
            if (newY + cubeRect.height > containerRect.bottom) newY = containerRect.bottom - cubeRect.height;

            cube.style.left = newX + 'px';
            cube.style.top = newY + 'px';
        }

        function mouseUpHandler() {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
});