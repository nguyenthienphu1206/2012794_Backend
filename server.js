const express = require('express')
const server = express()

// Tạo port =, nếu port bị trùng sẽ tìm port khác thay thế
const port = 3000 || process.env.port

const courses = [
    { id: 1, name: 'Nodejs' },
    { id: 2, name: 'ReactJS' },
    { id: 3, name: 'CSS' }
]

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

server.listen(port, () => console.log(`Server running on port ${port}`))