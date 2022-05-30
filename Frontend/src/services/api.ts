import IBrand from "../Models/IBrand";
import ICar from "../Models/ICar";
import ILoginRequest from "../Models/ILoginRequest";
import ILoginResponse from "../Models/ILoginResponse";
import IModel from "../Models/IModel";
import IParking from "../Models/IParking";
import IRegistryRequest from "../Models/IRegistryRequest";
import IRegistryResponse from "../Models/IRegistryResponse";
import IUserInfo from "../Models/IUserInfo";
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

class BrandEndpoint {

    get() {
        return get<Array<IBrand>>(`${stringConnection}/api/Brand`);
    }
    getById(brandId: string) {
        return get<IBrand | null>(`${stringConnection}/api/Brand/${brandId}`);
    }
    postNewBrand(brand: IBrand) {
        return post<IBrand, IBrand>(`${stringConnection}/api/Brand`, brand);
    }

}

class ModelEndpoint {

    get() {
        return get<Array<IModel>>(`${stringConnection}/api/Model`);
    }
    getById(ModelId: string) {
        return get<IBrand | null>(`${stringConnection}/api/Model/${ModelId}`);
    }
    postNewBrand(model: IModel) {
        return post<IModel, IModel>(`${stringConnection}/api/Model`, model);
    }

}

class CarEndpoint {

    get() {
        return get<Array<ICar>>(`${stringConnection}/api/Car`);
    }
    getById(carId: string) {
        return get<ICar | null>(`${stringConnection}/api/Car/${carId}`);
    }
    postNewBrand(car: ICar) {
        return post<ICar, ICar>(`${stringConnection}/api/Car`, car);
    }

}

//IParking todo FETCH API!!
class ParkingEndpoint {

    get() {
        return get<Array<IParking>>(`${stringConnection}/api/Parking`);
    }
    getById(carId: string) {
        return get<IParking | null>(`${stringConnection}/api/Parking/${carId}`);
    }
    postNewBrand(parking: IParking) {
        return post<IParking, IParking>(`${stringConnection}/api/Parking`, parking);
    }

}

class API {
    auth: AuthEnpoint = new AuthEnpoint();
    parking: ParkingEndpoint = new ParkingEndpoint();
    brand: BrandEndpoint = new BrandEndpoint();
    models: ModelEndpoint = new ModelEndpoint();
    car: CarEndpoint = new CarEndpoint();
}

export default new API();
