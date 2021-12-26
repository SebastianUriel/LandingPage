// .env
require('dotenv').config();

// Librerias
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

const whitelist = ['http://localhost:3000', 'https://tradunl.com'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors(corsOptions));

// Folder public
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// --- Proceso de encriptacion ---
const crypto = require('crypto');

const encript = (text) => {
    const iv = crypto.randomBytes(Number(process.env.RANDOM_BYTES));
    const cipher = crypto.createCipheriv(process.env.ALGORITHM, process.env.SECRET_KEY, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
}

const decrypt = (iv, content) => {
    const decipher = crypto.createDecipheriv(process.env.ALGORITHM, process.env.SECRET_KEY, Buffer.from(iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrpyted.toString();
}

app.post('/encript', (req, res) => {
    let { text } = req.body;
    let result = encript(text);
    return res.send(result);
});

app.post('/decrypt', (req, res) => {
    let { iv, content } = req.body;
    let result = decrypt(iv, content);
    return res.send({ text: result });
});

// --- Proceso envio de correo ---
const nodemailer = require('nodemailer');

const generateHtml = (name, cellphone, email, service, originLanguage, description, languagesToTraduct) => {
    const filePath = path.join(__dirname, 'email/formato.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = { name, cellphone, email, service, originLanguage, description, languagesToTraduct };
    return template(replacements);
}

app.post('/email', (req, res) => {
    try {
        let { 
            name, cellphone, email, service, originLanguage, description, destIngles, destPortugues, destJapones, destEspanol, destCoreano
        } = req.body;

        if(destIngles) destIngles = "Inglés";
        if(destPortugues) destPortugues = "Portugués";
        if(destJapones) destJapones = "Japonés";
        if(destEspanol) destEspanol = "Español";
        if(destCoreano) destCoreano= "Coreano";

        let languagesToTraduct = [destIngles, destPortugues, destJapones, destEspanol, destCoreano];

        let pass = decrypt(process.env.IV, process.env.CONTENT);
        let htmlToSend = generateHtml(name, cellphone, email, service, originLanguage, description, languagesToTraduct);
    
        let transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: pass
            }
        });
    
        let mailOptions = {
            from: process.env.EMAIL_ALIAS,
            to: [process.env.EMAIL_TO, email],
            subject: 'TRADUNL - ¡Gracias por contactarnos!',
            text: 'Resumen de tu solicitud',
            html: htmlToSend
        };
    
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return res.send({ message: 'Hay un error al tratar de enviar el contacto, favor de comunicarce con soporte.' });
            } else {
                console.log(info);
                return res.send({ message: '¡Envío de contacto exitoso!' });
            }
        });
    } catch(err) {
        console.log(err)
        return res.send({ message: 'Hay un error al tratar de enviar el contacto, favor de comunicarce con soporte.' });
    }

    /*return setTimeout(() => {
        return res.send({ message: '¡Envío de contacto exitoso!' });
    }, 4000);*/
});

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});