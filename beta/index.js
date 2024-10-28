// index.js

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  // Function to move the custom cursor elements
  document.addEventListener('mousemove', (e) => {
    cursorDot.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorOutline.style.top = e.clientY + 'px';
    cursorOutline.style.left = e.clientX + 'px';
  });

  // Get the button and link elements
  const button = document.querySelector('.button');
  const link = document.querySelector('.card__link');

  // Function to add hover effect
  const addHover = () => {
    cursorDot.classList.add('hover');
    cursorOutline.classList.add('hover');
  };
  const removeHover = () => {
    cursorDot.classList.remove('hover');
    cursorOutline.classList.remove('hover');
  };

  // Add hover effects to button and link
  [button, link].forEach((elem) => {
    elem.addEventListener('mouseenter', addHover);
    elem.addEventListener('mouseleave', removeHover);
  });

  // Handle mouse down and up events on the button
  button.addEventListener('mousedown', () => {
    cursorDot.classList.add('active');
    cursorOutline.classList.add('active');
  });

  button.addEventListener('mouseup', () => {
    cursorDot.classList.remove('active');
    cursorOutline.classList.remove('active');
    // Perform desired action on mouse up
    // For example, navigate to the next page
    // window.location.href = 'nextpage.html';
  });
  const slider = document.getElementById('slider');
  const slideTrigger = document.getElementById('slideTrigger');

  // Function to start the slider animation
  slideTrigger.addEventListener('click', function () {
    // Reset slider for replay
    slider.style.display = 'block'; // Make sure the slider is visible
    slider.classList.remove('slide'); // Remove the class if it was previously added

    // Trigger a reflow to allow the animation to restart
    void slider.offsetWidth;

    // Add the slide class to start the animation
    slider.classList.add('slide');
  });

  // After the animation ends
  slider.addEventListener('transitionend', function () {
    // Hide the slider after animation completes
    slider.style.display = 'none';
  });
});
