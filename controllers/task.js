const Task = require('../Models/task')

const getAllTasks =async (req,res) => {
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks}) 
    }catch(error){
        res.status(500).json({msg:error})
    }
    
}

const createTask = async (req,res) => {
    // res.send('create task')
    try{
        const task = await Task.create(req.body)
        res.status(201).json( { task } )
    }catch(error){
        res.status(500).json({msg:error})
    }
  
}
const getTask = async (req,res) => {
    // res.send('get single task')
    // res.json({id: req.params.id})
    try{
        const {id: TaskID} = req.params
        const task = await Task.findOne({_id:TaskID})

        if(!task){
            return next(createCustomError(`No task with id ${TaskID}`,404))
            
        }

        res.status(200).json({task})
    }catch(error){
        res.status(500).json({msg:error})
    } 
}


const deleteTask = async (req,res) => {
    try{
        const {id: TaskID} = req.params
        const task = await Task.findOneAndDelete({_id:TaskID})
            
        if(!task){
            return next(createCustomError(`No task with id ${TaskID}`,404))
        }
            
        res.status(200).json({task:null, status: 'success'})
    }catch(error){
        res.status(500).json({msg:error})
    }
    
}

const updateTask = async (req,res) => {
    // res.send('update task')
    try{
        const {id:taskID} = req.params
        const task = await Task.findByIdAndUpdate({_id:taskID},req.body,{new:true, runValidators:true,})

        if(!task){
            return next(createCustomError(`No task with id ${TaskID}`,404))
        }

        res.status(200).json({task}) 
    }catch(error){
        res.status(500).json({msg:error})
    }
    
}

module.exports = {getAllTasks,createTask,getTask,updateTask,deleteTask}