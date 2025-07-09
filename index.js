require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');

const app = express();
const router = express.Router();
app.use(bodyParser.json());

app.use((req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`IP do cliente: ${clientIp}`);
    next();
});
const express = require("express");
const app = express();

// ✅ Isso resolve o problema do X-Forwarded-For
app.set('trust proxy', 1);


const os = require('os');

function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      // Ignora IPv6 e endereços internos (loopback)
      if (net.family === 'IPv4' && !net.internal) {
        ips.push(net.address);
      }
    }
  }

  return ips;
}

const ips = getLocalIPs();
console.log('IP(s) da máquina:', ips.join(', '));


const connectToDatabase = require('./Database');

const AddLogin = require('./routes/add-login'); 
const authRoute = require('./routes/auth');
const GenerateKey = require('./routes/generate-key');
const Register = require('./routes/register');
const RemoveLogin = require('./routes/remove-login');
const resethwidRoute = require('./routes/resethwid');

const PORT = process.env.PORT || 3000;

app.use('/api', AddLogin);
app.use('/api', authRoute);
app.use('/api', GenerateKey);
app.use('/api', Register);
app.use('/api', RemoveLogin);
app.use('/api', resethwidRoute);

connectToDatabase().then(() => {
    app.listen(PORT, () => console.log('Sucesso '.green + `Servidor rodando na porta`, `${PORT}` .cyan));
});
