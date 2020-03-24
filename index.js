const express = require('express');
const path = require('path');
const app = express();

app.use(require('./middleware/logger'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/members', require('./routers/api/members'));

app.get('/', (req, res) => res.send('Hello express!!!'));

// app.get('/file', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
