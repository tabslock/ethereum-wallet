document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/generate-wallet', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (result.error) {
            document.getElementById('generate-button').style.display = 'none';
        } else {
            document.getElementById('generate-button').style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching wallet:', error);
    }
});
