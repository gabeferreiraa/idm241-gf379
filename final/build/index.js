// index.js
console.log('JavaScript file loaded successfully.');

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded event fired.');

  // Safely query elements and warn if missing
  function safeQuery(selector) {
    const el = document.querySelector(selector);
    if (!el) {
      console.error(`Element not found for selector: ${selector}`);
    }
    return el;
  }

  // Cursor Elements
  const cursorDot = safeQuery('.cursor-dot');
  const cursorOutline = safeQuery('.cursor-outline');
  const slider = safeQuery('#slider');
  const closeSliderButton = safeQuery('.close-slider');

  // Toast Notification
  const toast = safeQuery('#toastNotification');

  // Utility function: Show toast notification
  function showToast(message, duration = 3000) {
    if (!toast) {
      console.warn('Toast element not found. Cannot show toast message.');
      return;
    }
    console.log(`Showing toast message: "${message}"`);
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
      console.log('Hiding toast message');
    }, duration);
  }

  if (toast) {
    toast.addEventListener('transitionend', () => {
      if (toast.classList.contains('hide')) {
        toast.classList.remove('hide');
        console.log('Toast hidden');
      }
    });
  }

  // Custom Cursor Movement
  if (cursorDot && cursorOutline) {
    document.addEventListener('mousemove', (e) => {
      const { clientX: x, clientY: y } = e;
      cursorDot.style.left = `${x}px`;
      cursorDot.style.top = `${y}px`;
      cursorOutline.style.left = `${x}px`;
      cursorOutline.style.top = `${y}px`;
    });

    // Handle hover states on interactive elements
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

    // Active state on mouse down/up
    document.addEventListener('mousedown', () => {
      cursorDot.classList.add('active');
      cursorOutline.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
      cursorDot.classList.remove('active');
      cursorOutline.classList.remove('active');
    });
  } else {
    console.warn(
      'Custom cursor elements not found; default cursor will be used.'
    );
  }

  // Form Submission and Validation
  const form = safeQuery('#nameForm');
  const firstName = safeQuery('#firstName');
  const lastName = safeQuery('#lastName');
  const firstNameError = safeQuery('#firstNameError');
  const lastNameError = safeQuery('#lastNameError');

  function triggerShake(inputElement, errorMessageElement, message) {
    if (!inputElement || !errorMessageElement) {
      console.error('Input element or error message element is missing.');
      return;
    }

    console.log(`Triggering shake for ${inputElement.id}: ${message}`);
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block'; // Show the error message

    // Reset animation
    inputElement.classList.remove('error');
    void inputElement.offsetWidth; // force reflow
    inputElement.classList.add('error');
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('Form submission triggered.');

      let hasError = false;

      // Validate First Name
      if (!firstName || !firstName.value.trim()) {
        console.log('First name is empty.');
        if (firstName && firstNameError) {
          triggerShake(firstName, firstNameError, 'First name is required.');
        }
        hasError = true;
      } else if (!/^[a-zA-Z]+$/.test(firstName.value.trim())) {
        console.log('First name contains invalid characters.');
        triggerShake(
          firstName,
          firstNameError,
          'First name must contain only letters.'
        );
        hasError = true;
      } else {
        if (firstNameError) {
          console.log('First name is valid.');
          firstNameError.textContent = '';
          firstNameError.style.display = 'none'; // Hide the error message
        }
        if (firstName) firstName.classList.remove('error');
      }

      // Validate Last Name
      if (!lastName || !lastName.value.trim()) {
        console.log('Last name is empty.');
        if (lastName && lastNameError) {
          triggerShake(lastName, lastNameError, 'Last name is required.');
        }
        hasError = true;
      } else if (!/^[a-zA-Z]+$/.test(lastName.value.trim())) {
        console.log('Last name contains invalid characters.');
        triggerShake(
          lastName,
          lastNameError,
          'Last name must contain only letters.'
        );
        hasError = true;
      } else {
        if (lastNameError) {
          console.log('Last name is valid.');
          lastNameError.textContent = '';
          lastNameError.style.display = 'none'; // Hide the error message
        }
        if (lastName) lastName.classList.remove('error');
      }

      console.log(`Form validation completed. hasError: ${hasError}`);

      // If no errors, show toast and slider
      if (!hasError) {
        showToast('Form submitted successfully!', 2000);

        if (slider) {
          console.log('Displaying slider.');
          slider.style.display = 'block';
          slider.classList.remove('slide');
          void slider.offsetWidth; // force reflow
          slider.classList.add('slide');
        } else {
          console.warn(
            'Slider element not found. Cannot display success overlay.'
          );
        }
      }
    });
  } else {
    console.warn(
      'Form element not found. Validation and submission logic will not run.'
    );
  }

  // Handle slider close button click
  if (closeSliderButton && slider) {
    closeSliderButton.addEventListener('click', function () {
      console.log('Close slider button clicked.');
      slider.classList.remove('slide');

      slider.addEventListener('transitionend', function handleTransitionEnd() {
        slider.style.display = 'none';
        console.log('Slider hidden.');
        slider.removeEventListener('transitionend', handleTransitionEnd);
      });
    });
  } else {
    console.warn(
      'Slider or close button not found. Cannot close the slider overlay.'
    );
  }
});
