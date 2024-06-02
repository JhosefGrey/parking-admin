import { Component } from '@angular/core';
import { AdministradorVista } from './models/administradot';
import { Location } from '@angular/common';
import { AdministradorModalComponent } from './components/administrador-modal/administrador-modal.component';
import { DialogRemoteControl, AppearanceAnimation, DisappearanceAnimation } from '@ng-vibe/dialog';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { AdministradoresService } from './services/administradores.service';
import { AuthService } from '../../auth/pages/login/services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';
import { ToastTypeEnum } from '@ng-vibe/toastify';

@Component({
  selector: 'app-administradores',
  standalone: true,
  imports: [],
  templateUrl: './administradores.component.html',
  styleUrl: './administradores.component.scss'
})
export class AdministradoresComponent {

  listado: AdministradorVista[] = [];

  constructor(private _service: AdministradoresService, private _location: Location, private _auth :AuthService, private _shared: SharedService) { }

  ngOnInit(): void {
    this.getAll();
  }

  back() {
    this._location.back();
  }

  getAll() {
    this._service.getAll().subscribe((res) => this.listado = res);
  }

  openModal(tipo: 'crear' | 'editar', id?: string) {
    const dialog = new DialogRemoteControl(AdministradorModalComponent);
    dialog.options = {
      showOverlay: true,
      animationIn: AppearanceAnimation.BOUNCE_IN,
      animationOut: DisappearanceAnimation.BOUNCE_OUT,
    };

    dialog.openDialog({ esEditar: tipo === 'crear' ? false : true, id: id }).subscribe((res) => {
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

    dialog.openDialog({ title: null, content: '¿Está seguro(a) de querer borrar el registro?', textConfirm: null }).subscribe((res) => {
      if (res.result) {

        if(this._auth.user?._id === id){
          this._shared.mensaje('No puedes eliminarte a ti mismo', ToastTypeEnum.DANGER);
          return;
        }else{
        this._service.delete(id).subscribe(() => this.getAll());
        }

      }
    });

  }

}
