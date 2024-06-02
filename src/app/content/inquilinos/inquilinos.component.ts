import { Component } from '@angular/core';
import { DialogRemoteControl, AppearanceAnimation, DisappearanceAnimation } from '@ng-vibe/dialog';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { SharedService } from '../../../shared/services/shared.service';
import { InquilinoVista } from './models/inquilino';
import { InquilinosModalComponent } from './components/inquilinos-modal/inquilinos-modal.component';
import { Location } from '@angular/common';
import { InquilinosService } from './services/inquilinos.service';

@Component({
  selector: 'app-inquilinos',
  standalone: true,
  imports: [],
  templateUrl: './inquilinos.component.html',
  styleUrl: './inquilinos.component.scss'
})
export class InquilinosComponent {
  listado: InquilinoVista[] = [];

  constructor(private _service: InquilinosService, private _location: Location, private _shared: SharedService) { }

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
    const dialog = new DialogRemoteControl(InquilinosModalComponent);
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
