import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";
import { Payload } from "../models/interfaces/auth/Payload";

// Estenda a interface Request
interface AuthenticatedRequest extends Request {
    user_id?: string; 
}

export function isAuthenticated(
    
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) {
    // acessar token JWT
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        // validar token
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
        request.user_id = sub;
        return next(); // requisição vai prosseguir
    }catch (error){

    return response.send(401).end();

    }

}

