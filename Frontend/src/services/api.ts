import ILoginRequest from "../Models/ILoginRequest";
import ILoginResponse from "../Models/ILoginResponse";
import IRegistryRequest from "../Models/IRegistryRequest";
import IRegistryResponse from "../Models/IRegistryResponse";
import IUserInfo from "../Models/IUserInfo";
import IVideo from "../Models/IVideo";
import { get, post } from "./fetchWrap";

const stringConnection: string = "https://localhost:5000";

class AuthEnpoint {
    getUserInfo(): Promise<IUserInfo | null> {
        return get<IUserInfo | null>(`${stringConnection}/api/Auth`);
    }

    login(loginDetails: ILoginRequest): Promise<ILoginResponse> {
        return post<ILoginRequest, ILoginResponse>(`${stringConnection}/api/Auth/Login`, loginDetails);
    }

    register(registryDetails: IRegistryRequest): Promise<IRegistryResponse> {
        return post<IRegistryRequest, IRegistryResponse>(`${stringConnection}/api/Auth/Register`, registryDetails);
    }
}

//IParking todo FETCH API!!
class ParkingEndpoint {

    // get() {
    //     return get<Array<IParking>>(`${stringConnection}/api/Parking`);
    // }
    // getByURL(video: IVideo) {
    //     return get<IVideo|null>(`${stringConnection}/api/Rooms/Videos`);
    // }
    // postNewVideo(video: IVideo) {
    //     return post<IVideo, IVideo>(`${stringConnection}/api/Rooms/Videos`, video);
    // }

}

class API {
    auth: AuthEnpoint = new AuthEnpoint();
    parking:ParkingEndpoint = new ParkingEndpoint();
}

export default new API();
