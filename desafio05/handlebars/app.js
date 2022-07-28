const express = require('express');
const app = express();
const router = require('./routes');
const handlebars = require('express-handlebars');

const PORT = 8080;

app.engine(
   'hbs',
   handlebars.engine({
      extname: '.hbs',
      defaultLayout: 'index.hbs',
      layoutsDir: __dirname + '/views/layouts',
      partialsDir: __dirname + '/views/partials'
   })
);

app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));