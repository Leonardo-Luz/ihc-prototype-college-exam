import { userModel } from "../databaseInMem/models";
import { user } from "../databaseInMem/controllers/user.controller";


class Auth {
    loggedId = null as number | null;

    login = async ( userCheck: userModel ) =>
    {       
        user.itens.forEach(element => {
            if(element.username === userCheck.username && element.password === userCheck.password)
                this.loggedId = element.userId 
                return;
        });
    }

    logout = () =>
    {
        this.loggedId = null;
    }     
}

const auth = new Auth();

export default auth;