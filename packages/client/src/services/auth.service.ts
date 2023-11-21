import { userModel } from "../databaseInMem/models";
import { user } from "../databaseInMem/controllers/user.controller";


class Auth {
    loggedId = null as number | null;

    login = async ( userCheck: userModel ) =>
    {               
        const userLogin = user.itens.find( element => {
            return element.username === userCheck.username && element.password === userCheck.password
        });
        
        if(userLogin)
        {
            this.loggedId = userLogin.userId; 
            
            return 200;
        }
        else
            return 404;
    }

    logout = () =>
    {
        this.loggedId = null;
    }     
}

const auth = new Auth();

export default auth;