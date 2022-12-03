const client = require('./connection.js')
const express = require('express')
const server = express()
server.use(express.json())
// Tạo port =, nếu port bị trùng sẽ tìm port khác thay thế
const port = 3000 || process.env.port

//-------------------------------- GET --------------------------------------

server.get('/students', (req, res) => {
    client.query(`SELECT * FROM student`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end
})

server.get('/students/:id', (req, res) => {
    client.query(`SELECT * FROM student WHERE "studentId" = '${req.params.id}'`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end
})


//-------------------------------- POST --------------------------------------

const bpdyParser = require("body-parser")
server.use(bpdyParser.json())

server.post('/students/add', (req, res) => {
    const student = req.body
    let insertQuery = `INSERT INTO student("studentId", "firstName", "lastName", address) 
                        VALUES('${student.studentId}', '${student.firstName}', '${student.lastName}', '${student.address}')`
    
    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Inserttion was successfully')
        }
        else {
            res.send(err.message)
        }
    })
    client.end
})
/*
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

server.delete('/api/courses/delete/:id', (req, res) => {
    const course = courses.find(courses => courses.id === parseInt(req.params.id))
    let index = courses.indexOf(course)
    courses.splice(index, 1)
    
    res.send(JSON.stringify({
        success: true,
        notice: "Xóa thành công",
        data: courses
    }))
})*/

server.listen(port, () => console.log(`Server running on port ${port}`))

client.connect()