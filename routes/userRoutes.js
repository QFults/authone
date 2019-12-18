const { User } = require('../models')

module.exports = app => {
  app.post('/users', (req, res) => {
    const { name, email, username } = req.body
    User.register(new User({ name, email, username }), req.body.password, e => {
        if (e) {
          console.log(e)
        }
        res.sendStatus(200)
      })
  })

  app.post('/login', (req, res) => {
    User.authenticate()(req.body.username, req.body.password, (e, user) => {
      if (e) {
        console.log(e)
      }

      res.json(user)
    })
  })
}