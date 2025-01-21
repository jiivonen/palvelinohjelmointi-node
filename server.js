// Ensin kirjastojen importit
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Luodaan express-palvelin instanssi
const app = express();

// Otetaan käyttöön EJS-moottori
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

app.use('/tyylit', express.static('includes/styles'));
app.use('/images', express.static('includes/images'));

// Määritellään vakiot
const port = 3000;
const host = 'localhost';

// Määritellään polut
app.get('/', (req, res) => {
    let name = req.query.name;
    let showForm = false;

    if (!name) {
        name = 'vierailija';
        showForm = true;
    }

    res.render('index', { nimi: name, showForm: showForm });
});
app.get('/kissat', (req, res) => {
    res.render('kissat');
});


// Määritellään virhesivu
app.use((req, res) => {
    res.status(404).send("Sivua ei löytynyt.")
});
// Käynnistetään palvelin kuuntelemaan vakioiden mukaista osoitetta
app.listen(port, host, () => console.log(`${host}:${port} kuuntelee...`));
