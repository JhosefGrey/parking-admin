import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { UsuarioVista } from './models/usuarios';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { DialogRemoteControl, AppearanceAnimation, DisappearanceAnimation } from '@ng-vibe/dialog';
import { UsuarioModalComponent } from './components/usuario-modal/usuario-modal.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioVista[] = [];

  constructor(private _service: UsuariosService, private _location: Location) { }

  ngOnInit(): void {
    this.getAll();
  }

  back(){
    this._location.back();
  }

  getAll() {
    this._service.getAll().subscribe((res) => this.usuarios = res);
  }

  create() {
    const dialog = new DialogRemoteControl(UsuarioModalComponent);
    dialog.options = {
      showOverlay: true,
      animationIn: AppearanceAnimation.BOUNCE_IN,
      animationOut: DisappearanceAnimation.BOUNCE_OUT,
    };

    dialog.openDialog().subscribe((res) => {
      if (res.reload) {
        this.getAll();
      }
    });
  }

  delete(id: string) {

    const dialog = new DialogRemoteControl(ConfirmModalComponent);
    dialog.options = {
      showOverlay: true,
      animationIn: AppearanceAnimation.BOUNCE_IN,
      animationOut: DisappearanceAnimation.BOUNCE_OUT,
    };

    dialog.openDialog({ title: null, content: '¿Está seguro(a) de querer borrar el usuario?', textConfirm: null }).subscribe((res) => {
      if (res.result) {
        this._service.delete(id).subscribe(() => this.getAll());
      }
    });

  }

}
