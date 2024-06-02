import { Component, OnInit } from '@angular/core';
import { Solicitud } from './models/solicitud';
import { HomeService } from '../../home.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/pages/login/services/auth.service';
import { User } from '../../auth/pages/login/models/auth';
import { IMenu } from './models/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  solicitudes: Solicitud[] = [];
  user: User | null = null;

  opciones: IMenu[] = [
    {
      description: 'Catálogo de usuario',
      title: 'Usuarios',
      url: 'usuarios'
    },
    {
      description: 'Catálogo de administradores',
      title: 'Administradores',
      url: 'administradores'
    },
    {
      description: 'Catálogo de agentes',
      title: 'Agentes',
      url: 'agentes'
    },
    {
      description: 'Catálogo de bloques',
      title: 'Bloques',
      url: 'bloques'
    },
    {
      description: 'Catálogo de parqueos',
      title: 'Parqueos',
      url: 'parqueos'
    },
    {
      description: 'Consulta de solicitudes por agente',
      title: 'Solicitudes por agente',
      url: 'solicitudes-agente'
    },
  ]

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    // this._service.getMessages().subscribe((res) => this.solicitudes.push(res));
    this.user = this._auth.user;
    console.log(this._auth.user)
  }

  getPendientes() {
    let total = 0;
    this.solicitudes.forEach((x) => {
      if (x.entregado === false) {
        total++
      }
    })

    return total;
  }

  cerrar(solicitud: Solicitud) {
    solicitud.entregado = true;
  }


  logout(){
    this._auth.logOut();
  }


}
