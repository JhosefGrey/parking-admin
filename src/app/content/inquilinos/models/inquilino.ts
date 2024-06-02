export interface InquilinoVista {
    _id:       string;
    nombre:    string;
    apellido:  string;
    idCasa:    string;
    idUsuario: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface InquilinoCrear {
    nombre:    string;
    apellido:  string;
    idCasa:    string;
    idUsuario: string;
}


export interface InquilinoEditar {
    idInquilino:       string;
    nombre:    string;
    apellido:  string;
    idCasa:    string;
    idUsuario: string;
}
