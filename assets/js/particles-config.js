document.addEventListener("DOMContentLoaded", function() {

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const particleColor = isDark ? "#3399ff" : "#888888";

  particlesJS("particles", {
    "particles": {
      "number": {
        "value": 200,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": particleColor
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.3,
        "random": true
      },
      "size": {
        "value": 5,
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 120,
        "color": particleColor,
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1.5,
        "direction": "none",
        "out_mode": "out"
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        }
      },
      "modes": {
        "repulse": {
          "distance": 80
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });
});
