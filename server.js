const express = require('express')
const server = express()
server.use(express.json())

// Tạo port =, nếu port bị trùng sẽ tìm port khác thay thế
const port = 3000 || process.env.port

const courses = [
    { id: 1, name: 'Nodejs' },
    { id: 2, name: 'ReactJS' },
    { id: 3, name: 'CSS' }
]

//-------------------------------- GET --------------------------------------

// Khi mở trang web mặc định
server.get('/', (req, res) => {
    res.send('Chào mừng bạn tham gia khóa học')
})

// Khi thêm /api/courses sẽ trả về danh sách khóa học
server.get('/api/courses', (req, res) => {
    res.send(courses)
})

// Trả về khóa học theo id mình nhập, nếu không có sẽ thông báo
server.get('/api/courses/:id', (req, res) => {
    const course = courses.find(courses => courses.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send('ID không tồn tại')
    }
    res.send(course)
})

//-------------------------------- POST --------------------------------------

server.post('/api/courses/add', (req, res) => {
    const course = {
        id: req.body.id, // Phải thêm server.use(express.json())
        name: req.body.name
    }
    courses.push(course)
    res.send(JSON.stringify({ // convert sang json
        success: true,
        notice: "Thêm thành công",
        data: courses
    }))
})

//-------------------------------- PUT --------------------------------------

server.put('/api/courses/edit/:id', (req, res) => {
    const course = courses.find(courses => courses.id === parseInt(req.params.id))
    course.name = req.body.name

    res.send(JSON.stringify({ // convert sang json
        success: true,
        notice: "Cập nhật thành công",
        data: courses
    }))
})

//-------------------------------- DELETE --------------------------------------

server.listen(port, () => console.log(`Server running on port ${port}`))