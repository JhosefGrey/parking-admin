import { Component, OnInit, inject } from '@angular/core';
import { AdministradoresService } from '../../services/administradores.service';
import { AdministradorCrear } from '../../models/administradot';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogRemoteControl } from '@ng-vibe/dialog';
import { UsuariosService } from '../../../usuarios/usuarios.service';
import { UsuarioVista } from '../../../usuarios/models/usuarios';

@Component({
  selector: 'app-administrador-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrador-modal.component.html',
  styleUrl: './administrador-modal.component.scss'
})
export class AdministradorModalComponent implements OnInit {
  dialogRemoteControl: DialogRemoteControl = inject(DialogRemoteControl);

  esEditar: boolean = false;
  usuarios: UsuarioVista[] = [];
  idAdmin: string = '';
  constructor(private _service: AdministradoresService, private _usuario: UsuariosService) { }

  ngOnInit(): void {
    const { esEditar, id } = this.dialogRemoteControl.payload;

    // console.log(this.dialogRemoteControl.payload)

    this.esEditar = esEditar;

    if (this.esEditar) {
      this.idAdmin = id;
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

  obj: AdministradorCrear = {
    apellido: '',
    idUsuario: '',
    nombre: ''
  }

  save(): void {

    if (!this.esEditar) {
      this._service.create(this.obj).subscribe(() => {
        const data = { reload: true };
        this.dialogRemoteControl.closeDialog(data);
      })
    } else {
      this._service.update({ apellido: this.obj.apellido, idAdministrador: this.idAdmin, idUsuario: this.obj.idUsuario, nombre: this.obj.nombre }).subscribe(() => {
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
