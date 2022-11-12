const express = require('express')
const connectDb = require('./db/connect')
const app = express()
const tasks = require('./routes/task')
require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
//middleware
app.use(express.json())
app.use(express.static('./public'))

//routes
// app.get('/hello',(req,res)=>{
    //     res.send('Task manager app')
    // })
    
app.use(notFound)
app.use(errorHandlerMiddleware)
app.use('/api/v1/tasks',tasks)


//app.get('/api/v1/tasks) --- get all the tasks
//app.post('/api/v1/tasks) --- create a new task
//app.get('/api/v1/tasks/:id) --- get single task
//app.patch('/api/v1/tasks/:id) --- update task
//app.delete('/api/v1/tasks/:id) --- delete task



const port = process.env.PORT || 3000

const start = async () =>{
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listenning on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()




