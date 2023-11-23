import { Request, Response } from "express";
import { createUserServices } from "../../services/user/createUserService";
import { UserRequest } from "../../models/interfaces/user/UserRquest";

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password }: UserRequest = request.body;
        const CreateUserService = new createUserServices();
        const user =  await CreateUserService.execute({
            name, email , password
        });

        return response.json(user);
    }
}

export { CreateUserController }