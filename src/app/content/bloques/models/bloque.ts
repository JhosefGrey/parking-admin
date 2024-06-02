export interface BloqueVista {
    _id: string;
    codigo: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BloqueCrear {
    codigo: string;
}

export interface BloqueEditar {
    idBloque: string;
    codigo: string;
}

