import { Component } from '@angular/core';
import { DialogRemoteControl, AppearanceAnimation, DisappearanceAnimation } from '@ng-vibe/dialog';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { SharedService } from '../../../shared/services/shared.service';
import { ParqueoVista } from './models/parqueo';
import { ParqueoService } from './services/parqueo.service';
import { ParqueoModalComponent } from './components/parqueo-modal/parqueo-modal.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-parqueo',
  standalone: true,
  imports: [],
  templateUrl: './parqueo.component.html',
  styleUrl: './parqueo.component.scss'
})
export class ParqueoComponent {
  listado: ParqueoVista[] = [];

  constructor(private _service: ParqueoService, private _location: Location, private _shared: SharedService) { }

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
    const dialog = new DialogRemoteControl(ParqueoModalComponent);
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

        this._service.delete(id).subscribe(() => this.getAll());

      }
    });

  }
}
