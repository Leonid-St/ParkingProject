import IJwtToken from "./IJwtToken";
import IUserInfo from "./IUserInfo";

interface IUser {
    token: IJwtToken | null;
    userInfo: IUserInfo | null;
    IsOperator: boolean | null;
}

export default IUser;
