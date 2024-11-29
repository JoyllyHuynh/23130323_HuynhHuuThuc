document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting by default

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    const profilePicture = document.getElementById('profilePicture').files[0];
    if (!profilePicture) {
        alert('Please upload a profile picture.');
        return;
    }

    // Simulate form submission (for demonstration purposes)
    alert('Registration successful!');

    // Normally, you would send the form data to the server using fetch or AJAX
});
