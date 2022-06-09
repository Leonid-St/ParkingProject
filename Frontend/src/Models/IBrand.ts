import IModel from "./IModel";

interface IBrand {
    id: string;

    name: string;

    listModel: Array<IModel>;
}

export default IBrand;
