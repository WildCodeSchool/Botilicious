const nodemailer = require('nodemailer');

const Indexes = {

  // route GET '/erreur404' -- Affichage de la page d'erreur 404
  error404(req, res) {
    res.render('index/error');
  },

  // route GET '/' -- Affichage de la page d'inscription avec le formulaire
  indexGet(req, res) {
    console.log('render index');
    res.render('index/index');
  },

  indexPost(req, res) {
    res.send('post index ok');
  },

  // route GET -- envoie de mail pour confirmer son inscription
  emailPost(req, res) {
    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'bad2f38eae6508',
        pass: '359d3004ac5407',
      },
    });
    transport.sendMail({
      from: 'bob@gmail.com', // Expediteur
      to: 'supermario@gmail.com', // Destinataires
      subject: 'Cookies', // Sujet
      text: 'Hello, to confirm your account on Botilicious, click on the following url :', // plaintext body
      html: '<b>Hello world ✔</b>', // html body
    }, (error, response) => {
      if (error) {
        console.log(error);
        res.json({ servermessage: `${error}` });
      } else {
        res.json({ servermessage: `${response.message}` });
        console.log(`Message sent: ${response.message}`);
      }
    });
  },
};

module.exports = Indexes;
