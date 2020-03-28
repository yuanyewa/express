const express = require('express');
const path = require('path');
const exphdb = require('express-handlebars');
const app = express();
const members = require('./models/Members');

app.engine('handlebars', exphdb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(require('./middleware/logger'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => res.render('home', { someone: 'xiaohong', members }));
app.use('/api/members', require('./routers/api/members'));

app.get('/', (req, res) => res.send('Hello express!!!'));

// app.get('/file', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
