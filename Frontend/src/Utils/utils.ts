import IJwtToken from "../Models/IJwtToken";

export const getTokenFromLocalStorage = (): IJwtToken|null => {
    let localStorageToken = localStorage.getItem("token");

    if (localStorageToken) {
        let JwtToken: IJwtToken = JSON.parse(localStorageToken);
        if (JwtToken) {
            return JwtToken;
        }
    }

    return null;
};
