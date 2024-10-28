// index.js

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  const cursor = document.getElementById('customCursor');
  const button = document.querySelector('.button');
  const link = document.querySelector('.card__link');

  // Move the custom cursor with the mouse
  document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  });

  // Function to add hover effect
  const addHover = () => cursor.classList.add('hover');
  const removeHover = () => cursor.classList.remove('hover');

  // Add hover effects to button and link
  [button, link].forEach((elem) => {
    elem.addEventListener('mouseenter', addHover);
    elem.addEventListener('mouseleave', removeHover);
  });

  // Handle mouse down and up events
  button.addEventListener('mousedown', () => {
    cursor.classList.add('active');
  });

  button.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
    // Navigate to next page or perform desired action
    window.location.href = 'nextpage.html'; // Replace with your URL
  });
});
