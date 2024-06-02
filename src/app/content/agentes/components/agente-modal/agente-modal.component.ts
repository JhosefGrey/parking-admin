import { Component, inject } from '@angular/core';
import { AgenteService } from '../../services/agente.service';
import { DialogRemoteControl } from '@ng-vibe/dialog';
import { UsuarioVista } from '../../../usuarios/models/usuarios';
import { UsuariosService } from '../../../usuarios/usuarios.service';
import { AgenteCrear } from '../../models/agente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agente-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agente-modal.component.html',
  styleUrl: './agente-modal.component.scss'
})
export class AgenteModalComponent {
  dialogRemoteControl: DialogRemoteControl = inject(DialogRemoteControl);

  esEditar: boolean = false;
  usuarios: UsuarioVista[] = [];
  id: string = '';

  
  obj: AgenteCrear = {
    apellido: '',
    idUsuario: '',
    nombre: ''
  }

  constructor(private _service: AgenteService, private _usuario: UsuariosService) { }

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
    this._usuario.getAll().subscribe((res) => {
      this.usuarios = res;
    })
  }

  getById(id: string) {
    this._service.getById(id).subscribe((res) => {
      this.obj.apellido = res.apellido;
      this.obj.idUsuario = res.idUsuario;
      this.obj.nombre = res.nombre;
    })
  }

  save(): void {

    if (!this.esEditar) {
      this._service.create(this.obj).subscribe(() => {
        const data = { reload: true };
        this.dialogRemoteControl.closeDialog(data);
      })
    } else {
      this._service.update({ apellido: this.obj.apellido, idAgente: this.id, idUsuario: this.obj.idUsuario, nombre: this.obj.nombre }).subscribe(() => {
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
