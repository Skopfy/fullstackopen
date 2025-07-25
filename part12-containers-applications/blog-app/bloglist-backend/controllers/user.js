const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User
	  .find({}).populate('blogs', {user: 0})
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (password === undefined) {
	return response.status(400).json({ error: 'Password missing' })
    }

    if (password.length < 3) {
	return response.status(400).json({ error: 'Password must be at least 3 characters long.' })
    }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = userRouter
