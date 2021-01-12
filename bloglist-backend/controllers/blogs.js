const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comments')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ id:1, username:1, name: 1 }).populate('comments', { comment :1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end
  }
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Comment.find({ 'blog' : request.params.id })
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title : body.title,
    author: body.author,
    url : body.url,
    likes : body.likes === undefined ? 0 : body.likes,
    user : user._id,
    comments : []
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'cannot delete, token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)

  if ( blog.user._id.toString() === decodedToken.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    response.status(401).json({
      error: 'no permission'
    })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title : body.title,
    author : body.author,
    url : body.url,
    likes : body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new : true })
  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const id = request.params.id
  const comment = new Comment({
    comment : body.comment,
    blog : id
  })

  const blog = await Blog.findById(id)

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.json(savedComment)
})

module.exports = blogsRouter