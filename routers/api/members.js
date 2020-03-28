const express = require('express');
const uuid = require('uuid');
const members = require('../../models/Members');

const router = express.Router();

router.get('/', (req, res) => res.json(members));
router.get('/:id', (req, res) => {
    const found = members.some(m => m.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(m => m.id === parseInt(req.params.id)));
    } else {
        res.status(400).send("<h1>Error</h1>");
    }
});
router.post('/', (req, res) => {
  // res.send(req.body));
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email
  };
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({msg: "no name or email"});
  }
  members.push(newMember);
  res.redirect('/');
  // res.json(members);
});
router.put('/:id', (req, res) => {
  const found = members.some(m => m.id === parseInt(req.params.id));
  if (found) {
    const up = req.body;
    members.forEach(m => {
      if (m.id === parseInt(req.params.id)) {
        m.name = up.name;
        m.email = up.email;
      }
    });
    res.json({msg: "found id", members});
  } else {
    res.status(400).json({msg: "no such id"});
  }
});
router.delete('/:id', (req, res) => {
  const found = members.findIndex(m => m.id === parseInt(req.params.id));
  if (found != -1) {
    members.splice(found, 1);
    res.json(members);
  } else {
    res.status(400).json({msg: 'wrong ID'});
  }
});

module.exports = router;
