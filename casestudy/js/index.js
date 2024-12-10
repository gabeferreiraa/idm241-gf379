document.addEventListener('DOMContentLoaded', function () {
  // Cursor Elements
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  // Custom Cursor Movement
  document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;
    cursorOutline.style.left = `${x}px`;
    cursorOutline.style.top = `${y}px`;
  });

  // Handle hover effect on interactive elements
  const interactiveElements = document.querySelectorAll(
    'button, a, input, .toast'
  );

  interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hover');
      cursorOutline.classList.add('hover');
    });

    element.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hover');
      cursorOutline.classList.remove('hover');
    });
  });

  // Handle active state on mouse down and up
  document.addEventListener('mousedown', () => {
    cursorDot.classList.add('active');
    cursorOutline.classList.add('active');
  });

  document.addEventListener('mouseup', () => {
    cursorDot.classList.remove('active');
    cursorOutline.classList.remove('active');
  });
});
