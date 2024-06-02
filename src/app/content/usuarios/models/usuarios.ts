export interface UsuarioVista {
    _id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UsuarioCrear {
    email: string;
    clave: string
}

export interface UsuarioEditar {
    idUsuario: string;
    email: string;
    clave: string
}