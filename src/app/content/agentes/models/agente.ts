export interface AgenteVista {
    _id: string;
    nombre: string;
    apellido: string;
    idUsuario: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AgenteCrear {
    nombre: string;
    apellido: string;
    idUsuario: string;
}


export interface AgenteEditar {
    idAgente: string,
    nombre: string;
    apellido: string;
    idUsuario: string;
}
