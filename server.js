const express = require('express')
const server = express()

const port = 3000 || process.env.port

const courses = [
    { id: 1, name: 'Nodejs' },
    { id: 2, name: 'ReactJS' },
    { id: 3, name: 'CSS' }
]

server.get('/', (req, res) => {
    res.send('Chào mừng bạn tham gia khóa học')
})

server.get('/api/courses', (req, res) => {
    res.send(courses)
})

server.get('/api/courses/:id', (req, res) => {
    const course = courses.find(courses => courses.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send('ID không tồn tại')
    }
    res.send(course)
})

server.listen(port, () => console.log(`Server running on port ${port}`))