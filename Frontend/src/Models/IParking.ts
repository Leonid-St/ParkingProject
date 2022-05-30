import ICar from "./ICar";
import IParkingState from "./IParkingState";

//TODO MODEL !
interface IParking {
    id: string;

    userId: string;

    Car?: ICar;

    parkingState?: IParkingState;

    dateEntry?: Date;

    ExpectedDateExit?: Date;

    ActualDateExit?: Date;
}
export default IParking;