export interface AdministradorVista {
    _id: string;
    nombre: string;
    apellido: string;
    idUsuario: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AdministradorCrear {
    nombre: string;
    apellido: string;
    idUsuario: string;
}


export interface AdministradorEditar {
    idAdministrador: string,
    nombre: string;
    apellido: string;
    idUsuario: string;
}
