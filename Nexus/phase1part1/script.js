document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const userInput = document.getElementById('user');
  const passInput = document.getElementById('pass');
  const userError = document.getElementById('userError');
  const passError = document.getElementById('passError');

  form.addEventListener('submit', (e) => {
    let valid = true;

    // Validate Username
    if (userInput.value.trim() === "") {
      userError.style.display = 'block'; // Show the error message
      valid = false;
    } else {
      userError.style.display = 'none'; // Hide the error message
    }

    // Validate Password
    if (passInput.value.trim() === "") {
      passError.style.display = 'block'; // Show the error message
      valid = false;
    } else {
      passError.style.display = 'none'; // Hide the error message
    }

    if (!valid) {
      e.preventDefault(); // Prevent form submission if any input is invalid
    }
  });
});
