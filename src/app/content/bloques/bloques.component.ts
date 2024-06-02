import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { DialogRemoteControl, AppearanceAnimation, DisappearanceAnimation } from '@ng-vibe/dialog';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { SharedService } from '../../../shared/services/shared.service';
import { BloqueModalComponent } from './components/bloque-modal/bloque-modal.component';
import { BloqueVista } from './models/bloque';
import { BloqueService } from './services/bloque.service';

@Component({
  selector: 'app-bloques',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bloques.component.html',
  styleUrl: './bloques.component.scss'
})
export class BloquesComponent {
  listado: BloqueVista[] = [];

  constructor(private _service: BloqueService, private _location: Location, private _shared: SharedService) { }

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
    const dialog = new DialogRemoteControl(BloqueModalComponent);
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
