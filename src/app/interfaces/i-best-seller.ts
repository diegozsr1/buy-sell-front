import { IArticle } from "./i-article";

interface CP {
    valor: string;
    total_ventas: number;
}

interface Provincia {
    codigo: string;
    nombre: string;
    total_ventas:number;
}

interface IZonaModa {
    cp: CP;
    provincia: Provincia;
}

export interface IBestSeller {
    articulos: IArticle;
    zona_moda: IZonaModa;
}
