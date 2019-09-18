const express = require('express')
const app = express()
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs')
const db = knex({
        client: 'pg',
        connection: {
        host : '127.0.0.1', //localhost
        user : 'postgres',
        password : 'test',
        database : 'postgres'
        }
      });
      db.select('*').from('users').then(data => {
          console.log(data);
      });
    

var bodyParser = require('body-parser')
var cors = require('cors')

// const database = {
//   users: [{
//     id: '123',
//     name: 'John',
//     email: 'john@gmail.com',
//     entries: 0,
//     joined: new Date()
//   }],
//   secrets: {
//     users_id: '123',
//     hash: 'wghhh'
//   }
// }

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'))

app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
  .where('email', '=', req.body.email)
  .then(data => {
    const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
    if(isValid) {
      return db.select('*').from('users')
        .where('email', '=', req.body.email)
        .then(user=> {
          res.json(user[0])
        })
        .catch(err => res.status(400).json('Unable to get user'))
    } else {
      res.status(400).json('Wrong credentials')
    }
  })
  .catch(err => res.status(400).json('Wrong credentials'))
})

app.post('/findface', (req, res) => {
  database.users.forEach(user => {
    if (user.email === req.body.email) {
      user.entries++;
      res.json(user)
    }
  });
  res.json('nope')
})

//REGISTER--------------------------------
app.post('/register', (req, res) => {
    const {email, name, password} = req.body;

    const hash = bcrypt.hashSync(password); //password hash
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
    .returning('*')
    .insert({
        email: loginEmail,
        name: name,
        joined: new Date()
    })
  .then(user => {
      res.json(user[0]);
        })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
  .catch(err => res.status(400).json('Unable to register'))
})

//PROFILE/ID--------------------------------
app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if(user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('Not found')
        }
    })
  // res.json('no user')
  .catch(err => res.status(400).json('Error getting user'))
})

//IMAGE--------------------------------
app.put('/image', (req, res) => {
    const {id} = req.body;

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
})


app.listen(3001, () => console.log('Listening on port 3001!'))