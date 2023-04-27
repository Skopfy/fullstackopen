const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

//Taken from https://fullstackopen.com/en/part4/user_administration#creating-a-new-note
describe('when there is initially one user in db', () => {
    
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('POST /api/users', () => {
    
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('creation fails if password is too short or non existent', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
	  username: 'mluukkai',
	  name: 'Matti Luukkainen',
	  password: 'sa',
      }

      await api
	  .post('/api/users')
	  .send(newUser)
	  .expect(400)
	  .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

      const newUser2 = {
	  username: 'mluukkai',
	  name: 'Matti Luukkainen',
      }

      await api
	  .post('/api/users')
	  .send(newUser2)
	  .expect(400)
	  .expect('Content-Type', /application\/json/)
  })


   test('creation fails if username is too short or non existent', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
	  username: 'ml',
	  name: 'Matti Luukkainen',
	  password: 'salainen',
      }

      await api
	  .post('/api/users')
	  .send(newUser)
	  .expect(400)
	  .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

      const newUser2 = {
	  name: 'Matti Luukkainen',
	  password: 'salainen',
      }

      await api
	  .post('/api/users')
	  .send(newUser2)
	  .expect(400)
	  .expect('Content-Type', /application\/json/)
  })
})

