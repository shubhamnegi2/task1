let form = document.getElementById('responseForm');
let radios = form.querySelectorAll('input[type="radio"]');
let submitBtn = document.getElementById('submitBtn');
let submitText = document.getElementById('submitText');
let submitSpinner = document.getElementById('submitSpinner');

radios.forEach(radio => {
    radio.addEventListener('change', () => {
        submitBtn.disabled = false;
    });
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    submitSpinner.style.display = 'inline-block';
    submitText.textContent = 'Submitting...';

    setTimeout(() => {
        submitText.textContent = 'Submitted ✅';
        submitSpinner.style.display = 'none';
        document.querySelector('.jsTask').style.display = 'block';
    }, 2000);


});
