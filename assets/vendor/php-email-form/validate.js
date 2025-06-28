/**
* PHP Email Form Validation - v3.10
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function () {
      // Show loader and reset messages on submit
      form.querySelector('.loading').classList.add('d-block');
      form.querySelector('.error-message').classList.remove('d-block');
      form.querySelector('.sent-message').classList.remove('d-block');
    });

    // Handle Netlify response after redirect
    if (window.location.search.includes('success')) {
      form.querySelector('.loading').classList.remove('d-block');
      form.querySelector('.sent-message').classList.add('d-block');
    }

    if (window.location.search.includes('error')) {
      form.querySelector('.loading').classList.remove('d-block');
      form.querySelector('.error-message').classList.add('d-block');
    }
  });
})();
