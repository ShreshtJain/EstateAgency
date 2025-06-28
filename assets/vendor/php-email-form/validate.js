
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
      const encodedData = new URLSearchParams(formData).toString();

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedData
      })
        .then(response => {
          loading.classList.remove('d-block');
          if (response.ok) {
            sentMessage.classList.add('d-block');
            form.reset();
          } else {
            throw new Error("Form submission failed.");
          }
        })
        .catch(error => {
          loading.classList.remove('d-block');
          errorMessage.textContent = "Something went wrong. Please try again.";
          errorMessage.classList.add('d-block');
          console.error(error);
        });
    });
  });
})();

