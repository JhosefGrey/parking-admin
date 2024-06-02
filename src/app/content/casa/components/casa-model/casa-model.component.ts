import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogRemoteControl } from '@ng-vibe/dialog';
import { CasaCrear } from '../../models/casa';
import { CasaService } from '../../services/casa.service';
import { BloqueVista } from '../../../bloques/models/bloque';
import { BloqueService } from '../../../bloques/services/bloque.service';

@Component({
  selector: 'app-casa-model',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './casa-model.component.html',
  styleUrl: './casa-model.component.scss'
})
export class CasaModelComponent {
  dialogRemoteControl: DialogRemoteControl = inject(DialogRemoteControl);

  esEditar: boolean = false;
  id: string = '';
  bloques: BloqueVista[] = [];

  obj: CasaCrear = {
    codigo: '',
    bloqueId: '',
    direccion: ''
  }

  constructor(private _service: CasaService,  private _bloque: BloqueService) { }

  ngOnInit(): void {
    const { esEditar, id } = this.dialogRemoteControl.payload;

    this.esEditar = esEditar;

    if (this.esEditar) {
      this.id = id;
      this.getById(id);
    }
    this.getAllUsuarios();

  }

  getAllUsuarios() {
    this._bloque.getAll().subscribe((res) => {
      this.bloques = res;
    })
  }
  getById(id: string) {
    this._service.getById(id).subscribe((res) => {
      this.obj.codigo = res.codigo;
      this.obj.bloqueId = res.bloqueId;
      this.obj.direccion = res.direccion;
    })
  }

  save(): void {

    if (!this.esEditar) {
      this._service.create(this.obj).subscribe(() => {
        const data = { reload: true };
        this.dialogRemoteControl.closeDialog(data);
      })
    } else {
      this._service.update({ codigo: this.obj.codigo, bloqueId: this.obj.bloqueId, direccion: this.obj.direccion, idCasa: this.id}).subscribe(() => {
        const data = { reload: true };
        this.dialogRemoteControl.closeDialog(data);
      })
    }

  }

  close(): void {
    const data = { reload: false };
    this.dialogRemoteControl.closeDialog(data);
  }
}
