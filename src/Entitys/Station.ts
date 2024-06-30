export interface IStation {
    id: string,
    props: {
        name: string;
        cnpj: string;
        coord: {
            latitude: number;
            longitude: number;
        }
    }
}