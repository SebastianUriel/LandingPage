const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');

let nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: "sbonnilla.workitmx@gmail.com",
		pass: "sbs33mil"
	}
});

let mailOptions = {
	from: 'sbonnilla.workitmx@gmail.com',
	to: 'sebastian.bonillaaglr@gmail.com',
	subject: 'Nice Nodemailer test',
	text: 'Hey there, it’s our first message sent with Nodemailer ',
	html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />'
};

app.use(cors());

app.post('/email', (req, res) => {
    /*transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            return res.status(500).json({
                error: error
            });
        } else {
            let message = 'Message sent: %s' + info;
            console.log(info);
            res.send({
                data: {
                    info: info
                }
            });
        }
    });*/
    return setTimeout(() => {
        return res.send({
            data: {
                message: '¡Envío de contacto exitoso!'
            }
        });
    }, 4000);
});

app.use(express.static('public'));
app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});