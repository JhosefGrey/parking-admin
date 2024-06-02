export interface SolicitudAgenteVista {
    _id:               string;
    agenteAsignado:    string;
    completada:        boolean;
    fechaAsignado:     Date;
    fechaSolicitud:    Date;
    parqueoSolicitado: string;
    usuarioSolicitud:  string;
    createdAt:         Date;
    updatedAt:         Date;
    inquilino:         Inquilino;
    parqueo:           Parqueo;
}

export interface Inquilino {
    _id:       string;
    nombre:    string;
    apellido:  string;
    idCasa:    string;
    idUsuario: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Parqueo {
    _id:       string;
    codigo:    string;
    ocupado:   boolean;
    bloqueId:  string;
    createdAt: Date;
    updatedAt: Date;
}
