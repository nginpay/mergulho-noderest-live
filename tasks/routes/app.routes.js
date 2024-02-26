module.exports = app => {

    const router = require('express').Router()

    const Auth = require('../middleware/authVerify')


    const AppHandler = require('../handler/app.handler')
    const UserHandler = require('../handler/user.handler')

    // endpoint para criar tarefa
    router.post('/task', Auth, AppHandler.createTask)

    // endpoint para listar tarefasF
    router.get('/tasks', Auth, AppHandler.listAllTasks)

    // endpoint para listar detalhes de uma tarefa
    router.get('/task/:id', Auth, AppHandler.taskDetails )

    // endpoint para atualizar status de uma tarefa
    router.put('/task/:id', Auth, AppHandler.updateTaskStatus )

    // endpoint para excluir uma tarefa
    router.delete('/task/:id', Auth, AppHandler.deleteTask)


    //rotas de usuários
    router.post('/signup', UserHandler.signUp)
    
    router.post('/signin', UserHandler.signIn)

    app.use('/api', router)

}