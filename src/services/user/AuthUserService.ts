import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma/index";
import { AuthRequest } from "../../models/interfaces/auth/AuthRequest"

class AuthUserServices {


    async execute({ email, password }: AuthRequest) {
        if (!email) {
            throw new Error("Email precisa ser enviado")

        }
        if(!password){
            throw new Error("senha precisa ser enviado")
        }
    
        //verificar banco de dados se existe user com email passado!
        const user = await prismaClient.user.findFirst({
            where: {
                email:email
            }
        });

        if(!user){
            throw Error("email errado!")
        }

        const passwordMatch =  await compare(password, user?.password)

        if(!passwordMatch){
            throw new Error("Sua senha está errada!");
        }

        const token = sign(
            {
                name: user?.name,
                email: user?.email
              
            },
        process.env.JWT_SECRET as string,
        
        {
            subject: user?.id,
            expiresIn: "30d"
        }   

        );

        return{
          id: user?.id,
          name: user?.name,
          email: user?.email,
          token: token

        } 

        
    }
}

export {AuthUserServices}