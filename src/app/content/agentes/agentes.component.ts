import { Component } from '@angular/core';
import { AgenteService } from './services/agente.service';
import { DialogRemoteControl, AppearanceAnimation, DisappearanceAnimation } from '@ng-vibe/dialog';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { SharedService } from '../../../shared/services/shared.service';
import { AgenteModalComponent } from './components/agente-modal/agente-modal.component';
import { AgenteVista } from './models/agente';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agentes',
  standalone: true,
  imports: [],
  templateUrl: './agentes.component.html',
  styleUrl: './agentes.component.scss'
})
export class AgentesComponent {
  listado: AgenteVista[] = [];

  constructor(private _service: AgenteService, private _location: Location, private _shared: SharedService) { }

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
    const dialog = new DialogRemoteControl(AgenteModalComponent);
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
