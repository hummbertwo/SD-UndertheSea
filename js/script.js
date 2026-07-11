document.querySelectorAll('.download-btn').forEach(button => {
  button.addEventListener('click', () => {
    const fileUrl = button.getAttribute('data-link');
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

// ===== BURBUJAS (en lugar de nieve) =====
const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const bubbles = [];

for (let i = 0; i < 80; i++) {
  bubbles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 12 + 3,
    speed: Math.random() * 0.6 + 0.2,
    drift: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.5 + 0.3
  });
}

function drawBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let b of bubbles) {
    // Sombra suave para dar profundidad
    ctx.shadowColor = "rgba(255,255,255,0.2)";
    ctx.shadowBlur = 10;

    // Burbuja principal (relleno semitransparente)
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 230, 255, ${b.opacity * 0.4})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity * 0.6})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Reflejo (brillo)
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.8})`;
    ctx.fill();

    // Actualizar posición (suben)
    b.y -= b.speed;
    b.x += b.drift;

    // Reiniciar cuando salen por arriba
    if (b.y < -b.r * 2) {
      b.y = canvas.height + b.r * 2;
      b.x = Math.random() * canvas.width;
      b.r = Math.random() * 12 + 3;
      b.speed = Math.random() * 0.6 + 0.2;
    }
  }

  requestAnimationFrame(drawBubbles);
}

drawBubbles();