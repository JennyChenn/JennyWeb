document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.btn-liquid');

    buttons.forEach(button => {
        const canvas = document.createElement('canvas');
        button.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = button.offsetWidth + 100;
        canvas.height = button.offsetHeight + 100;

        let points = [];
        const pointsCount = 8;
        const viscosity = 20;
        const mouseDist = 70;
        const damping = 0.05;

        const relMouse = { x: 0, y: 0 };
        const mouseSpeed = { x: 0, y: 0 };

        function createPoints() {
            points = [];
            const xStart = canvas.height / 2;
            for (let i = 1; i < pointsCount; i++) {
                points.push(new Point(xStart + ((canvas.width - canvas.height) / pointsCount) * i, 0));
            }
            points.push(new Point(canvas.width, canvas.height / 2));
            points.push(new Point(canvas.width - canvas.height / 5, canvas.height));
            points.push(new Point(xStart, canvas.height));
            points.push(new Point(-canvas.height / 10, canvas.height / 2));
        }

        function Point(x, y) {
            this.x = this.ix = x;
            this.y = this.iy = y;
            this.vx = 0;
            this.vy = 0;
        }

        Point.prototype.move = function () {
            this.vx += (this.ix - this.x) / viscosity;
            this.vy += (this.iy - this.y) / viscosity;

            const dx = this.ix - relMouse.x;
            const dy = this.iy - relMouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseDist) {
                const force = (1 - (distance / mouseDist)) * 2;
                this.vx += mouseSpeed.x * force;
                this.vy += mouseSpeed.y * force;
            }

            this.vx *= 1 - damping;
            this.vy *= 1 - damping;

            this.x += this.vx;
            this.y += this.vy;
        };

        function updateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = button.style.background || '#81d4fa';

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (let i = 0; i < points.length; i++) {
                const next = points[i + 1] || points[0];
                const cx = (points[i].x + next.x) / 2;
                const cy = (points[i].y + next.y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, cx, cy);
            }

            ctx.closePath();
            ctx.fill();

            points.forEach(point => point.move());

            requestAnimationFrame(updateCanvas);
        }

        function handleMouseMove(event) {
            const rect = canvas.getBoundingClientRect();
            relMouse.x = event.clientX - rect.left;
            relMouse.y = event.clientY - rect.top;

            mouseSpeed.x = (event.movementX || 0) / 2;
            mouseSpeed.y = (event.movementY || 0) / 2;
        }

        createPoints();
        updateCanvas();
        button.addEventListener('mousemove', handleMouseMove);
    });
});
