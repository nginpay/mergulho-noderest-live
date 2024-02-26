const { User } = require('../models/index')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const salt = bcrypt.genSaltSync(10);

exports.signUp = async (req, res) => {

    try {

        var { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
            return res.json({ msg: 'Todos os dados são necessários para criar a conta de usuário' })
        }

        password = bcrypt.hashSync(password, salt);

        const data = {
            firstName,
            lastName,
            email,
            password
        }

        const newUser = await User.create(data)

        if (!newUser) {
            return res.json({ msg: "alguma coisa saiu errado na hora de criar a conta. tente outra vez." })
        }

        return res.json(newUser)


    } catch (error) {

        return res.status(500).send({
            error: 'error',
            message: error.message
        })

    }

}


exports.signIn = async (req, res) => {

    try {

        const { email, password } = req.body

        //validar se o usuário existe na base de dados
        const account = await User.findOne({where: {email}})

        if(!account) {
            return res.status(400).json({msg: 'usuário não encontrado'})
        }

        //validar se a senha desse usuário é válida
        const passwordMatch = bcrypt.compareSync(password, account.password);

        if(!passwordMatch) {
            return res.status(400).json({msg: 'senha incorreta. Tente novamente.'})
        }

        //gerar um token de autenticação

        const payload = {
            user: {
                owner: account.id,
                email: account.email,
                username: account.firstName
            }
        }

        const token = jwt.sign(
            payload,
            process.env.SECRET);

        return res.json({
            auth: true,
            token: token
        })

    } catch (error) {

        return res.status(500).send({
            error: 'error',
            message: error.message
        })

    }

}