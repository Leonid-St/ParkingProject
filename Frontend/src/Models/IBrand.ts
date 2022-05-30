import IModel from "./IModel";

interface IBrand {
    id: string;

    brandName: string;

    listModel: Array<IModel>;
}

export default IBrand;
