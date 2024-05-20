import express from 'express';
import fs from 'fs';
import path from 'path';
import Web3 from 'web3';
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();
const port = 3000;

const __dirname = path.resolve();
const usersFilePath = path.join(__dirname, 'data', 'users.json');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}));

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: 'Username and password are required.' });
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath));
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        return res.json({ success: false, message: 'Username already exists.' });
    }

    const web3 = new Web3();
    const wallet = web3.eth.accounts.create();

    const newUser = {
        username,
        password,
        address: wallet.address,
        privateKey: wallet.privateKey
    };

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.json({ success: true, newUser });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: 'Username and password are required.' });
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath));
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.json({ success: false, message: 'Invalid username or password.' });
    }

    req.session.user = user;
    res.json({ success: true });
});

app.get('/generate-wallet', async (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const web3 = new Web3('https://mainnet.infura.io/v3/3720dfa230c24ce891c244b57a1142d6'); // Infura API kullanarak Ethereum RPC URL'si
    const wallet = web3.eth.accounts.create();

    try {
        const balance = await web3.eth.getBalance(wallet.address);
        const balanceInEth = web3.utils.fromWei(balance, 'ether');
        
        const walletInfo = {
            address: wallet.address,
            privateKey: wallet.privateKey,
            balance: balanceInEth
        };

        res.json(walletInfo);
    } catch (error) {
        console.error('Error generating wallet:', error);
        res.status(500).json({ error: 'An error occurred while generating wallet' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


app.get('/check-login', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});
