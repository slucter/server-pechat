require('dotenv').config()
const app = require('express')();
const http = require('http').Server(app);
const cors = require('cors')
const routes = require('./src/router/index')
const bodyParser = require('body-parser')
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080'
    }
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/api',routes)
app.use('/', (req, res) => {
    res.send('hello')
})

io.on('connection', socket => {
    console.log(`konek id => ${socket.id}`)
    socket.on('init-user', data => {
        socket.join('room'+data.username)
    })
    socket.on('message', data => {
        io.to('room'+data.to).emit('message', data)
    })

    socket.on('disconnect', () => {
        io.emit('disconneck', 'ada yang diskonek')
    })
})

http.listen(process.env.SRV_PORT, ()=> console.log(`Server running on ${process.env.SRV_HOST}:${process.env.SRV_PORT}`))