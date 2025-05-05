function setParticlesHeight() {
  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer) {
    particlesContainer.style.height = Math.max(window.innerHeight, document.body.scrollHeight) + 'px';
  }
}

function startParticles() {
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 1000
        }
      },
      "color": { "value": "#4a4a54" },
      "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000" } },
      "opacity": { "value": 0.6, "random": false },
      "size": { "value": 2, "random": false },
      "line_linked": {
        "enable": true,
        "distance": 180,
        "color": "#4a4a54",
        "opacity": 0.5,
        "width": 1.2
      },
      "move": {
        "enable": true,
        "speed": 0.4,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": false, "mode": "push" },
        "resize": true
      },
      "modes": {
        "grab": { "distance": 180, "line_linked": { "opacity": 0.7 } },
        "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
        "repulse": { "distance": 200, "duration": 0.4 },
        "push": { "particles_nb": 4 },
        "remove": { "particles_nb": 2 }
      }
    },
    "retina_detect": true
  });
}

(function addSmoothMouseAttract() {
  let mouse = { x: null, y: null };
  let smoothMouse = { x: null, y: null };
  let isOverCanvas = false;
  const smoothing = 0.12;

  const particlesEl = document.getElementById('particles-js');
  let canvas = null;
  function updateCanvasRef() {
    if (particlesEl) {
      canvas = particlesEl.querySelector('canvas');
    }
  }
  setTimeout(updateCanvasRef, 500);

  document.addEventListener('mousemove', function(e) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    // devicePixelRatio düzeltmesi eklendi
    const dpr = window.devicePixelRatio || 1;
    if (
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom
    ) {
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
      isOverCanvas = true;
    } else {
      isOverCanvas = false;
    }
  });

  if (particlesEl) {
    particlesEl.addEventListener('mouseleave', function() {
      isOverCanvas = false;
    });
    particlesEl.addEventListener('mouseenter', function() {
      isOverCanvas = true;
    });
  }

  function animateSmoothMouse() {
    if (isOverCanvas && mouse.x !== null && mouse.y !== null) {
      if (smoothMouse.x === null || smoothMouse.y === null) {
        smoothMouse.x = mouse.x;
        smoothMouse.y = mouse.y;
      } else {
        smoothMouse.x += (mouse.x - smoothMouse.x) * smoothing;
        smoothMouse.y += (mouse.y - smoothMouse.y) * smoothing;
      }
      if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.interactivity.mouse.pos_x = smoothMouse.x;
        window.pJSDom[0].pJS.interactivity.mouse.pos_y = smoothMouse.y;
        window.pJSDom[0].pJS.interactivity.status = 'mousemove';
      }
    } else {
      if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.interactivity.mouse.pos_x = null;
        window.pJSDom[0].pJS.interactivity.mouse.pos_y = null;
        window.pJSDom[0].pJS.interactivity.status = 'mouseleave';
      }
    }
    requestAnimationFrame(animateSmoothMouse);
  }
  animateSmoothMouse();
})();

document.addEventListener('DOMContentLoaded', () => {
  setParticlesHeight();
  startParticles();
  setTimeout(() => {
    setParticlesHeight();
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
      window.pJSDom[0].pJS.fn.canvasSize();
    }
  }, 100);
});

window.addEventListener('resize', () => {
  setParticlesHeight();
  if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
    window.pJSDom[0].pJS.fn.canvasSize();
  }
});

window.addEventListener('scroll', setParticlesHeight);