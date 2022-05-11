import IJwtToken from "./IJwtToken";

interface ILoginResponse {
    token: IJwtToken | null;
    errors: Array<string>;
    isOperator:boolean;
}

export default ILoginResponse;
