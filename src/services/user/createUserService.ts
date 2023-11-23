import prismaClient from "../../prisma";
import { hash } from "bcryptjs"
import {UserRequest} from "../../models/interfaces/user/UserRquest"

class createUserServices{

    async execute({name, email, password}: UserRequest) {
        if (!email){
            throw new Error("email incorreto");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if (userAlreadyExists){
            throw new Error("email já existe");
        }
        // encriptando senha do user!
        const passwordHash = await hash(password, 8);

        //criando user!
        const user = prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user;
    }

}

export{createUserServices}