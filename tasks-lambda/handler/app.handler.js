const { Task } = require('../models/index')
const jwt = require('jsonwebtoken')

exports.createTask = async (req, res) => {

    try {

        const { taskName, description } = req.body

        if (!taskName ) {
            return res.json({ msg: 'você precisa informar o node da tarefa e/ou o usuário a quem ela pertence' })
        }

        const data = {
            taskName: taskName,
            description: description,
            owner: req.user.owner
        }

        const newTask = await Task.create(data)

        if (!newTask) {
            return res.json({ msg: "erro ao criar a task" })
        }

        return res.json(newTask)

    } catch (error) {

        return res.status(500).send({
            error: 'error',
            message: error.message
        })

    }
}

exports.listAllTasks = async (req, res, next) => {

    try {

        const filter = req.query

        const owner = req.user.owner

        const tasksList = await Task.findAll({where: filter, owner})
        return res.json(tasksList)

    } catch (error) {

        return res.status(500).send({
            error: 'error',
            message: error.message
        })

    }
   
}

exports.taskDetails = async (req, res) => {

    const id = req.params.id
    const owner = req.user.owner

    const taskDetailsById = await Task.findOne({ where: { id, owner } })

    if(!taskDetailsById){
        return res.json({msg: 'task não encontrada'})
    }

    return res.json(taskDetailsById)
}

exports.updateTaskStatus = async (req, res) => {

    const id = req.params.id
    const taskData = req.body

    const owner = req.user.owner

    const updateTaskStatusById = await Task.update(taskData, { where: { id, owner} })

    return res.json({ msg: `Atualizando dados da tarefa ${id}` })
}

exports.deleteTask = async (req, res) => {

    const id = req.params.id

    const owner = req.user.owner

    const deleteTaskById = await Task.destroy({ where: { id , owner} })

    return res.json({ msg: `Excluindo tarefa ${id}` })
}