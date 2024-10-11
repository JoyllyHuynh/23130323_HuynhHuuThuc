document.getElementById('showRegister').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});
document.getElementById('showLogin').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});
document.getElementById('showForgotPassword').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('forgotPasswordForm').style.display = 'block';
});
document.getElementById('showLoginFromForgot').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('forgotPasswordForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});
// Xử lý sự kiện đăng nhập
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn gửi form
    // Giả lập đăng nhập thành công
    window.location.href = 'home.html'; // Điều hướng đến trang chào mừng
});
// Xử lý sự kiện đăng xuất (cần thêm vào welcome.html)
document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'index.html'; // Quay lại trang đăng nhập
});
document.getElementById('exerciseButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Hiện tab Exercise
    document.getElementById('exerciseTab').style.display = 'block';
    
    // Điều hướng đến trang exercise.html
    window.location.href = 'exercise.html';
});
document.addEventListener("DOMContentLoaded", function() {
    const accountIcon = document.querySelector(".account-icon");
    const accountInfo = document.getElementById("accountInfo");
    accountIcon.addEventListener("click", function() {
        // Hiện hoặc ẩn thông tin tài khoản
        if (accountInfo.style.display === "none") {
            accountInfo.style.display = "block";
        } else {
            accountInfo.style.display = "none";
        }
    });
    // Nếu cần, có thể thêm sự kiện cho nút đổi mật khẩu
    const changePasswordButton = document.getElementById("changePasswordButton");
    changePasswordButton.addEventListener("click", function() {
        alert("Chức năng đổi mật khẩu sẽ được thực hiện ở đây.");
        // Có thể mở một modal hoặc redirect đến trang đổi mật khẩu
    });
});