const Task = require('../Models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')


const getAllTasks = asyncWrapper( async (req,res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks}) 
})

const createTask = asyncWrapper(async (req,res) => {
    // res.send('create task')
    
    const task = await Task.create(req.body)
    res.status(201).json( { task } )
  
})

const getTask = asyncWrapper(async (req,res) => {
    // res.send('get single task')
    // res.json({id: req.params.id})

    
    const {id: TaskID} = req.params
    const task = await Task.findOne({_id:TaskID})

    if(!task){
        return next(createCustomError(`No task with id ${TaskID}`,404))
        
     }

    res.status(200).json({task})
    
})


const deleteTask = asyncWrapper(async (req,res) => {
    
    const {id: TaskID} = req.params
    const task = await Task.findOneAndDelete({_id:TaskID})
        
    if(!task){
        return next(createCustomError(`No task with id ${TaskID}`,404))
    }
        
    res.status(200).json({task:null, status: 'success'})
    
})

const updateTask = asyncWrapper(async (req,res) => {
    // res.send('update task')
    
    const {id:taskID} = req.params
    const task = await Task.findByIdAndUpdate({_id:taskID},req.body,{new:true, runValidators:true,})

    if(!task){
        return next(createCustomError(`No task with id ${TaskID}`,404))
    }

    res.status(200).json({task}) 
    
})

module.exports = {getAllTasks,createTask,getTask,updateTask,deleteTask}