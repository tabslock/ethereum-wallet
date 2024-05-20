document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result.success) {
        alert('Login successful.');

        // Kullanıcı giriş yaptıktan sonra cüzdan oluşturma sayfasına yönlendirme
        window.location.href = 'index.html'; // Bu kısmı generate wallet sayfasının URL'si ile değiştirin

    } else {
        alert('Login failed: ' + result.message);
    }
});
