import {Redirect} from "react-router";

export const Logout: React.FunctionComponent = () => {
    localStorage.removeItem("token");

    return (
        <>
            <Redirect to="/welcome"/>
        </>
    );
};
export default Logout;
