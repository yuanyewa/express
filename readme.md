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
https://github.com/ericf/express-handlebars
npm i express-handlebars
// views/main.handlebars, views/layouts/home.handlebars
app.engine('handlebars', exphdb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.get('/', (req, res) => res.render('home', { someone: 'xiaohong', members }));
main.handlebars:
<html lang="en">
<head>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <title>Members App</title>
</head>
<body>
  <div class="container mt-4">
    {{{body}}}
  </div>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" integrity="sha384-6khuMg9gaYr5AxOqhkVIODVIvm9ynTT5J4V1cfthmT+emCG6yVmEZsRHdxlotUnm" crossorigin="anonymous"></script>
</body>
</html>
home.handlebars:
<form action="/api/members" method="POST" class="mb-4">
<div class="form-group">
  <label for="name">Name</label>
  <input type="text" name="name" class="form-control">
</div>
<div class="form-group">
  <label for="email">Email</label>
  <input type="email" name="email" class="form-control">
</div>
<input type="submit" value="Add Member" class="btn btn-primary">
</form>

<h1>Members is {{someone}}</h1>
{{#each members}}
<li class="list-group-item">{{name}}</li>
{{/each}}

<a href="/api/members" class="btn btn-light">Visit API</a>

Redirect from res.json to redirect:
  // res.json(members);
  res.redirect('/');

