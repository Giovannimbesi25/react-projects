import jwt from "jsonwebtoken";
import { createError } from "./error.js";


//Verifico che il token dell'utente che ha fatto la richiesta sia un token valido
//sulla base della secret key
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token)
        return (next(createError(401, "You are not authenticated")))

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) 
            return (next(createError(401, "Token is not valid!")))

        req.user = user;
        next();
    });
}


//Verifica che l'utente cui è stato associato il token verificato, 
//Abbia lo stesso ID, usato nella richiesta
//Potrei infatti aver effettuato il login con un utente(ed il suo token valido),
//ma tentare di accedere ai dati di un altro utente, per tale motivo,
//confronto l'id nei params con l'id
export const verifyUser = (req, res, next) => {
    verifyToken(req, res,  () => {
        if(req.user.id === req.params.id || req.user.isAdmin)
            next();
        else{
            return (next(createError(401, "You are not authorized!")))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res ,() => {
        if(req.user.isAdmin){
            console.log("SEI UN ADMIN")
            next();
        }
        else{
            console.log("NON SEI UN ADMIN")
            return (next(createError(401, "You are not Admin!")))
        }
    })
}

