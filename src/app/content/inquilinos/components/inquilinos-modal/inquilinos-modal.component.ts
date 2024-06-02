import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogRemoteControl } from '@ng-vibe/dialog';
import { CasaVista } from '../../../casa/models/casa';
import { CasaService } from '../../../casa/services/casa.service';
import { InquilinoCrear } from '../../models/inquilino';
import { InquilinosService } from '../../services/inquilinos.service';
import { UsuarioVista } from '../../../usuarios/models/usuarios';
import { UsuariosService } from '../../../usuarios/usuarios.service';

@Component({
  selector: 'app-inquilinos-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquilinos-modal.component.html',
  styleUrl: './inquilinos-modal.component.scss'
})
export class InquilinosModalComponent {
  dialogRemoteControl: DialogRemoteControl = inject(DialogRemoteControl);

  esEditar: boolean = false;
  id: string = '';
  casas: CasaVista[] = [];
  usuarios: UsuarioVista[] = [];

  obj: InquilinoCrear = {
    apellido: '',
    idCasa: '',
    idUsuario: '',
    nombre: ''
  }

  constructor(private _service: InquilinosService, private _bloque: CasaService,  private _usuario: UsuariosService) { }

  ngOnInit(): void {
    const { esEditar, id } = this.dialogRemoteControl.payload;

    this.esEditar = esEditar;

    if (this.esEditar) {
      this.id = id;
      this.getById(id);
    }
    this.getAllUsuarios();
    this.getAllCasas();

  }

  getAllUsuarios() {
    this._usuario.getAll().subscribe((res) => {
      this.usuarios = res;
    })
  }

  getAllCasas() {
    this._bloque.getAll().subscribe((res) => {
      this.casas = res;
    })
  }
  getById(id: string) {
    this._service.getById(id).subscribe((res) => {
      this.obj.apellido = res.apellido;
      this.obj.idCasa = res.idCasa;
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
      this._service.update({ idInquilino: this.id, apellido: this.obj.apellido, idCasa: this.obj.idCasa, idUsuario: this.obj.idUsuario, nombre: this.obj.nombre }).subscribe(() => {
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
