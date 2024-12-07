document.addEventListener('DOMContentLoaded', function () {
  // Cursor Elements
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  const slider = document.getElementById('slider');
  const closeSliderButton = document.querySelector('.close-slider'); // Select the close button

  // Toast Notification
  const toast = document.getElementById('toastNotification');

  // Show toast notification
  function showToast(message, duration = 3000) {
    toast.textContent = message; // Set the message
    toast.classList.add('show'); // Add 'show' class to make it visible

    // Hide the toast after the duration
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide'); // Add 'hide' class for smooth exit
    }, duration);
  }

  // Handle transitionend to reset the 'hide' class
  toast.addEventListener('transitionend', () => {
    if (toast.classList.contains('hide')) {
      toast.classList.remove('hide');
    }
  });

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

  // Form Submission and Validation
  const form = document.getElementById('nameForm');
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const firstNameError = document.getElementById('firstNameError');
  const lastNameError = document.getElementById('lastNameError');

  // Utility function to trigger the shake animation
  function triggerShake(inputElement, errorMessageElement, message) {
    // Update error message
    errorMessageElement.textContent = message;

    // Remove 'error' class if it exists to allow re-triggering
    inputElement.classList.remove('error');

    // Force reflow to reset animation
    void inputElement.offsetWidth;

    // Add 'error' class to trigger shake animation
    inputElement.classList.add('error');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let hasError = false;

    // Validate First Name
    if (!firstName.value.match(/^[a-zA-Z]+$/)) {
      triggerShake(
        firstName,
        firstNameError,
        'First name must contain only letters.'
      );
      hasError = true;
    } else {
      firstNameError.textContent = '';
      firstName.classList.remove('error');
    }

    // Validate Last Name
    if (!lastName.value.match(/^[a-zA-Z]+$/)) {
      triggerShake(
        lastName,
        lastNameError,
        'Last name must contain only letters.'
      );
      hasError = true;
    } else {
      lastNameError.textContent = '';
      lastName.classList.remove('error');
    }

    if (!hasError) {
      // Success toast
      showToast('Form submitted successfully!', 2000);

      // Show the slider without auto-closing
      slider.style.display = 'block'; // Make slider visible
      slider.classList.remove('slide'); // Reset class if already there

      // Force reflow to allow the animation to restart
      void slider.offsetWidth;

      // Add slide class to start the animation
      slider.classList.add('slide');
    }
  });

  // Handle slider close button click
  closeSliderButton.addEventListener('click', function () {
    // Remove the 'slide' class to trigger the slide-out animation
    slider.classList.remove('slide');

    // Listen for the end of the transition to hide the slider
    slider.addEventListener('transitionend', function handleTransitionEnd() {
      slider.style.display = 'none'; // Hide the slider
      slider.removeEventListener('transitionend', handleTransitionEnd); // Clean up the listener
    });
  });

  // Remove auto-hide functionality (Commented out)
  /*
  slider.addEventListener('transitionend', function () {
    slider.style.display = 'none'; // hide slider after animation completes
  });
  */
});
