const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initial_blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of initial_blogs) {
	let blogObject = new Blog(blog)
	await blogObject.save()
    }
})
describe('GET /api/blogs', () => {
    test('api: blogs are returned as json & the correct amount', async () => {
    await api.get('/api/blogs')
	.expect(200)
	.expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initial_blogs.length)
    })

    test('api: blogs have identifier "id" as property', async () => {
	const response = await api.get('/api/blogs')
	expect((response.body)[0].id).toBeDefined();
    })
})

describe('POST /api/blogs', () => {
    //Ex 4.10
    test('a new blog can be added. No of posts is incremented & saved blog correctly fetched from db', async () => {
	const newBlog =  {
	    title: "New blog",
	    author: "Von Neumann",
	    url: "https://newpatterns.com/",
	    likes: 20,
	}
	
    
	await api
	    .post('/api/blogs')
	    .send(newBlog)
	    .expect(201)
	    .expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')
	const titles = response.body.map(r => r.title)
	
	expect(response.body).toHaveLength(initial_blogs.length + 1) //Test increment
	expect(titles).toContain( //Test if saved to db
	    'New blog'
	)
    })
    
    //Ex 4.11
    test('if a new blog without the likes property is added it defaults to zero', async () => {
	const newBlog =  {
	    title: "New blog without likes",
	    author: "Von Neumann",
	    url: "https://newpatterns.com/",
	}
	
    
	await api
	    .post('/api/blogs')
	    .send(newBlog)
	    .expect(201)
	    .expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')
	const len_blogs = response.body.length
	const titles = response.body.map(r => r.title)
	
	
	expect(response.body).toHaveLength(initial_blogs.length + 1)
	expect(titles).toContain( //Test if saved to db
	    'New blog without likes'
	)
	expect(response.body[len_blogs - 1].likes).toBe(0)
    })
    //Ex 4.12
    test('if title or url is missing, respond with 400 Bad Request', async () => {
	const newBlog =  {
	    author: "Mr. NoTitle",
	    url: "https://notitle.com/",
	    likes: 5,
	}
	
    
	await api
	    .post('/api/blogs')
	    .send(newBlog)
	    .expect(400)

	const newBlog2 =  {
	    title: "NoUrl",
	    author: "Mr. NoUrl",
	    likes: 5,
	}
	
    
	await api
	    .post('/api/blogs')
	    .send(newBlog2)
	    .expect(400)

    })
})

describe('DELETE /api/blogs', () => {
    //Ex 4.13
    test('To be deleted blog is missing and no of blogs reduced by one', async () => {
	
	const id = (initial_blogs[0])._id
	await api
	      .delete(`/api/blogs/${id}`)
	    .expect(204)

	const response = await api.get('/api/blogs')
	const ids = response.body.map(r => r.id)
	
	expect(response.body).toHaveLength(initial_blogs.length - 1)
	expect(ids).not.toContain(id)
	
    

    })
})

afterAll(() => {
  mongoose.connection.close()
})
