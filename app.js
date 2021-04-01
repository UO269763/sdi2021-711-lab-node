//Módulos
let express = require('express');
let app = express();

let crypto = require('crypto');

let fileUpload = require('express-fileupload');
app.use(fileUpload());
let mongo = require('mongodb');
let swig = require('swig');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app,mongo);

app.use(express.static('public'));

//Variables
app.set('port', 8081);
app.set('db', 'mongodb://admin:sdi@tiendamusica-shard-00-00.wxhqv.mongodb.net:27017,tiendamusica-shard-00-01.wxhqv.mongodb.net:27017,tiendamusica-shard-00-02.wxhqv.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-9otbjb-shard-0&authSource=admin&retryWrites=true&w=majority');
let expressSession = require('express-session');
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));
app.set('clave','abcdefg');
app.set('crypto',crypto);

//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, swig, gestorBD);
require("./routes/rcanciones.js")(app, swig, gestorBD);
require("./routes/rautores.js")(app, swig);

//Lanzar el servidor
app.listen(app.get('port'), function (){
    console.log('Servidor activo');
});