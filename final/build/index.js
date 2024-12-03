document.addEventListener('DOMContentLoaded', function () {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  const slider = document.getElementById('slider');

  const toast = document.getElementById('toastNotification');

  // show toast
  function showToast(message, duration = 3000) {
    toast.textContent = message; // Set the message
    toast.classList.add('show'); // Add 'show' class to make it visible

    // Hide the toast after the duration
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide'); // Add 'hide' class for smooth exit
    }, duration);

    // Remove 'hide' class after animation ends to reset
    toast.addEventListener('transitionend', () => {
      if (toast.classList.contains('hide')) {
        toast.classList.remove('hide');
      }
    });
  }

  // usage
  showToast('Form submitted successfully!', 3000);

  // custom cursor elements
  document.addEventListener('mousemove', (e) => {
    cursorDot.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorOutline.style.top = e.clientY + 'px';
    cursorOutline.style.left = e.clientX + 'px';
  });

  // submission and validation
  document.getElementById('nameForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');

    let hasError = false;

    if (!firstName.value.match(/^[a-zA-Z]+$/)) {
      firstNameError.textContent = 'First name must contain only letters.';
      firstName.classList.add('error');
      hasError = true;
    } else {
      firstNameError.textContent = '';
      firstName.classList.remove('error');
    }

    if (!lastName.value.match(/^[a-zA-Z]+$/)) {
      lastNameError.textContent = 'Last name must contain only letters.';
      lastName.classList.add('error');
      hasError = true;
    } else {
      lastNameError.textContent = '';
      lastName.classList.remove('error');
    }

    if (!hasError) {
      // success toast
      showToast('Form submitted successfully!', 2000);

      // toast duration before starting the slider
      setTimeout(() => {
        slider.style.display = 'block'; // make slider visible
        slider.classList.remove('slide'); // reset class if alr there

        // reflow to allow the animation to restart
        void slider.offsetWidth;

        // slide class to start the animation
        slider.classList.add('slide');
      }, 2000);
    }
  });

  // after animation ends
  slider.addEventListener('transitionend', function () {
    slider.style.display = 'none'; // hide slider after animation completes
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  // Update cursor position on mouse move
  document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;

    // Move cursor elements to the correct positions
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
