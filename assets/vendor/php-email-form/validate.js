/**
* PHP Email Form Validation - v3.10
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const loading = form.querySelector('.loading');
      const errorMessage = form.querySelector('.error-message');
      const sentMessage = form.querySelector('.sent-message');

      loading.classList.add('d-block');
      errorMessage.classList.remove('d-block');
      sentMessage.classList.remove('d-block');

      const formData = new FormData(form);

      fetch('/', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          loading.classList.remove('d-block');
          if (response.ok) {
            sentMessage.classList.add('d-block');
            form.reset();
          } else {
            return response.text().then(text => {
              throw new Error(text);
            });
          }
        })
        .catch(error => {
          loading.classList.remove('d-block');
          errorMessage.innerHTML = "Something went wrong. Please try again.";
          errorMessage.classList.add('d-block');
        });
    });
  });
})();

