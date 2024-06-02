import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content.component';
import { AgentesComponent } from './agentes/agentes.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BloquesComponent } from './bloques/bloques.component';
import { ParqueoComponent } from './parqueo/parqueo.component';
import { SolicitudAgenteComponent } from './solicitud-agente/solicitud-agente.component';
import { InquilinosComponent } from './inquilinos/inquilinos.component';
import { CasaComponent } from './casa/casa.component';

export const CONTENT_ROUTES: Routes = [
    {
        path: '', loadComponent: () => ContentComponent,
        children: [
            {
                path: 'home', loadComponent: () => HomeComponent
            },
            {
                path: 'usuarios', loadComponent: () => UsuariosComponent
            },
            {
                path: 'administradores', loadComponent: () => AdministradoresComponent
            },
            {
                path: 'agentes', loadComponent: () => AgentesComponent
            },
            {
                path: 'bloques', loadComponent: () => BloquesComponent
            },
            {
                path: 'parqueos', loadComponent: () => ParqueoComponent
            },
            {
                path: 'casas', loadComponent: () => CasaComponent
            },
            {
                path: 'inquilinos', loadComponent: () => InquilinosComponent
            },
            {
                path: 'solicitudes-agente', loadComponent: () => SolicitudAgenteComponent
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ]
    }
];
