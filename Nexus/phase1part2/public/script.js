document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('authForm');
    const userInput = document.getElementById('user');
    const passInput = document.getElementById('pass');
    const confirmPassInput = document.getElementById('confirmPass');
    const userError = document.getElementById('userError');
    const passError = document.getElementById('passError');
    const confirmPassError = document.getElementById('confirmPassError');
    const formTitle = document.getElementById('formTitle');
    const submitButton = document.getElementById('submitButton');
    const switchFormLink = document.getElementById('switchForm');
    const switchText = document.getElementById('switchText');
    const passwordDiv = document.getElementById('passwordDiv');
    const confirmPasswordDiv = document.getElementById('confirmPasswordDiv');

    let isLogin = true;

    switchFormLink.addEventListener('click', (e) => {
        e.preventDefault();
        isLogin = !isLogin;
        if (isLogin) {
            formTitle.textContent = 'Login';
            submitButton.textContent = 'LOGIN';
            switchText.innerHTML = 'New User? <a href="#" id="switchForm">Create an Account</a>';
            confirmPasswordDiv.style.display = 'none';
        } else {
            formTitle.textContent = 'Signup';
            submitButton.textContent = 'SIGNUP';
            switchText.innerHTML = 'Already have an account? <a href="#" id="switchForm">Login</a>';
            confirmPasswordDiv.style.display = 'block';
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let valid = true;

        // Validate Username or Email
        if (!userInput.value) {
            userError.style.display = 'block';
            valid = false;
        } else {
            userError.style.display = 'none';
        }

        // Validate Password
        if (!passInput.value) {
            passError.style.display = 'block';
            valid = false;
        } else {
            passError.style.display = 'none';
        }

        // Validate Confirm Password if Signup
        if (!isLogin && passInput.value !== confirmPassInput.value) {
            confirmPassError.style.display = 'block';
            valid = false;
        } else {
            confirmPassError.style.display = 'none';
        }

        if (!valid) return;

        const endpoint = isLogin ? '/api/login' : '/api/signup';
        const data = {
            username: userInput.value,
            password: passInput.value,
        };

        if (!isLogin) data.confirmPassword = confirmPassInput.value;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
            alert('Authentication successful!');
        } else {
            alert('Authentication failed: ' + result.message);
        }
    });

    // Background slideshow
    const images = ['background1.jpg', 'background2.jpg', 'background3.jpg'];
    let currentImageIndex = 0;

    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        document.body.style.backgroundImage = `url(${images[currentImageIndex]})`;
    }, 5000);
});
