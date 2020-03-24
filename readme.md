Express barebone template
npm init -y
npm i express
npm i nodemon
modify package.json:
    "start": "node index.js",
    "dev": "nodemon index.js",

Server static folder:
    app.use(express.static(path.join(__dirname, 'public')));
Serve file:
    app.get('/file', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
Server url:
    app.get('/', (req, res) => res.send('Hello express!!!'));

Add style:
    cd public; mkdir css; touch style.css; edit: body {background: black; color: white;}
    edit index.html: <link rel="stylesheet" href="css/style.css">

Get json:
    const members = [{id: 1, name: 'xiaohong'}, {id: 2, name: 'xiaolan}];
    app.get('/api/members', (req, res) => res.json(members));

Use separate json file:
    mkdir models; touch Members.js (use upper case for model)
    copy json, add "module.exports = members;"
    In index.js: const members = require('./models/Member');

Use middleware:
    const logger = (req, res, next) => {
        console.log("I'm the middleware");
        next();
    }
    app.use(logger);

log current time:
    const moment = require('moment');
    inside middleware: console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)

Move middleware to a file:
    mkdir middleware; touch logger.js;
    copy content, add "module.exports = logger;"
    Index.js: app.use(require('./middleware/logger.js));

Get ID from url:
    app.get('/api/members/:id', (req, res) => res.send(req.params.id));

Use filter:
    res.json(members.filter(m => m.id === parseInt(req.params.id)));

Use router:
    mkdir routes; cd routes; mkdir api; cd api; touch members.js
    const express = require('express');
    const members = require('../../models/Members');
    const router = express.Router();
    route.get('/', func);
    router.get('/:id', func);
    module.exports = router;
    Index.js: app.use('/api/members', require('./routers/api/members'));

Post json api:
    index.js: app.use(express.json());
    members.js: router.post('/', (req, res) => res.send(req.body));
    or, members.push(newMember); res.json(members);

Modify id:
  router.put('/:id', (req, res) => {
  members.forEach(m => {
    if (m.id === parseInt(req.params.id)) {
      m.name = req.body.name;
      m.email = req.body.email;
    }});
  res.json({msg: "found id", members});

Delete id:
  const found = members.findIndex(m => m.id === parseInt(req.params.id));
  members.splice(found, 1);
  res.json(members);

Express-handlebars:
