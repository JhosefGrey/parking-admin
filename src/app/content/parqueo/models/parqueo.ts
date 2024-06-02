export interface ParqueoVista {
    _id:       string;
    codigo:    string;
    ocupado:   boolean;
    bloqueId:  string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ParqueoCrear {
    codigo:    string;
    bloqueId:  string;
}

export interface ParqueoEditar {
    idParqueo:       string;
    codigo:    string;
    bloqueId:  string;
}
