const ApiError=require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const generateJwt = (id,email) =>{
    return jwt.sign(
        {id,email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'},
        {algorithm:'HS256'}
    )
}
class UserController{
    async registration(req,res,next){
        const {email, password}=req.body
        if (!email || !password){
            return next(ApiError.badRequest('Некорректный email или password'))

        }
        const candicat = await User.findOne({where:{email}})
        if(candicat){
            return next(ApiError.badRequest('Пользователь с таким e-mail уже есть'))
        }
        const  hashPassword=await bcrypt.hash(password,5)
        const user = await User.create({email,password:hashPassword})
        const token = generateJwt(user.id,user.email)

        return res.json({token})


    }

    async login(req,res,next){
        const {email,password}=req.body
        const user=await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.badRequest('user not found'))

        }
        let comparePassword=bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return next(ApiError.badRequest('Неверный пароль'))

        }
        const token = generateJwt(user.id,user.email)
        return res.json({token})
    }

    async check(req,res,next) {
        try {

            const token = generateJwt(req.user.id, req.user.email)

            return res.json({token})

        } catch (e) {
            return next(ApiError.badRequest("ошибка тут"))
        }
    }

}

module.exports=new UserController()