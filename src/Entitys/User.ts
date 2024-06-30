import { IStation } from "./Station";

export interface ICreateUserBody {
    id?: string;
    name: string;
    phone: string;
    password: string;
    positionId: string;
    stationId: string;
}
export interface IUser {
    id?: string;
    props: {
        name: string;
        phone: string;
        password: string;
        positionId: string;
        stationId: string;
    }
}
