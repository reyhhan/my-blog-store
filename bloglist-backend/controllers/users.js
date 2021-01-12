const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url:1, title: 1, likes: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password === undefined){
    return response.status(400).json({
      error: 'Password is required'
    })
  }
  if(body.password.length < 3){
    return response.status(400).json({
      error: 'Password too short'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter