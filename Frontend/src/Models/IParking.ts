import ICar from "./ICar";
import IParkingState from "./IParkingState";

//TODO MODEL !
interface IParking {
    id: string;

    userId: string;

    carId:string;

    parkingState?: IParkingState;

    dateEntry?: Date;

    expectedDateExit?: Date;

    actualDateExit?: Date;
}
export default IParking;