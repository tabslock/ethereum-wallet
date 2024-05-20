document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/generate-wallet', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (!result.error) {
            document.getElementById('generate-button').style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching wallet:', error);
    }
});

document.getElementById('generate-button').addEventListener('click', async () => {
    try {
        const response = await fetch('/generate-wallet', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        alert(`Your new wallet address: ${result.address}\nPrivate Key: ${result.privateKey}`);
    } catch (error) {
        console.error('Error generating wallet:', error);
    }
});
