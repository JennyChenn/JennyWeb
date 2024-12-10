document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.btn-liquid');

    buttons.forEach(button => {
        const canvas = document.createElement('canvas');
        button.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = button.offsetWidth + 100;
        canvas.height = button.offsetHeight + 100;

        const points = [];
        const viscosity = 20;
        const damping = 0.1;

        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * (Math.PI * 2);
            const x = Math.cos(angle) * (canvas.width / 2) + canvas.width / 2;
            const y = Math.sin(angle) * (canvas.height / 2) + canvas.height / 2;

            points.push({
                x: x,
                y: y,
                originX: x,
                originY: y,
                vx: 0,
                vy: 0,
            });
        }

        function updatePoints(mouseX, mouseY) {
            points.forEach(point => {
                const dx = point.originX - mouseX;
                const dy = point.originY - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    point.vx += force * (dx / distance) * 2;
                    point.vy += force * (dy / distance) * 2;
                }

                point.vx *= (1 - damping);
                point.vy *= (1 - damping);

                point.x += point.vx;
                point.y += point.vy;
            });
        }

        function renderCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (let i = 1; i < points.length; i++) {
                const point = points[i];
                const nextPoint = points[i + 1] || points[0];
                const cx = (point.x + nextPoint.x) / 2;
                const cy = (point.y + nextPoint.y) / 2;

                ctx.quadraticCurveTo(point.x, point.y, cx, cy);
            }

            ctx.closePath();
            ctx.fillStyle = button.style.background || '#81d4fa';
            ctx.fill();
        }

        function animate(mouseX, mouseY) {
            updatePoints(mouseX, mouseY);
            renderCanvas();
            requestAnimationFrame(() => animate(mouseX, mouseY));
        }

        canvas.addEventListener('mousemove', e => {
            const rect = canvas.getBoundingClientRect();
            animate(e.clientX - rect.left, e.clientY - rect.top);
        });

        animate(0, 0);
    });
});
