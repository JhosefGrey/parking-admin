import { Component, inject } from '@angular/core';
import { BloqueVista } from '../../../bloques/models/bloque';
import { BloqueService } from '../../../bloques/services/bloque.service';
import { DialogRemoteControl } from '@ng-vibe/dialog';
import { ParqueoCrear } from '../../models/parqueo';
import { ParqueoService } from '../../services/parqueo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parqueo-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parqueo-modal.component.html',
  styleUrl: './parqueo-modal.component.scss'
})
export class ParqueoModalComponent {
  dialogRemoteControl: DialogRemoteControl = inject(DialogRemoteControl);

  esEditar: boolean = false;
  bloques: BloqueVista[] = [];
  id: string = '';


  obj: ParqueoCrear = {
    bloqueId: '',
    codigo: ''
  }

  constructor(private _service: ParqueoService, private _bloque: BloqueService) { }

  ngOnInit(): void {
    const { esEditar, id } = this.dialogRemoteControl.payload;

    // console.log(this.dialogRemoteControl.payload)

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
      this.obj.bloqueId = res.bloqueId;
      this.obj.codigo = res.codigo;
    })
  }

  save(): void {

    if (!this.esEditar) {
      this._service.create(this.obj).subscribe(() => {
        const data = { reload: true };
        this.dialogRemoteControl.closeDialog(data);
      })
    } else {
      this._service.update({ bloqueId: this.obj.bloqueId, codigo: this.obj.codigo, idParqueo: this.id }).subscribe(() => {
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
