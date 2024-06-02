import { Component, inject } from '@angular/core';
import { DialogRemoteControl } from '@ng-vibe/dialog';
import { UsuarioCrear } from '../../models/usuarios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-usuario-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-modal.component.html',
  styleUrl: './usuario-modal.component.scss'
})
export class UsuarioModalComponent {
  dialogRemoteControl: DialogRemoteControl = inject(DialogRemoteControl);

  constructor(private _service: UsuariosService) { }

  obj: UsuarioCrear = {
    clave: '',
    email: ''
  }

  save(): void {
    this._service.create(this.obj).subscribe(() => {
      const data = { reload: true };
      this.dialogRemoteControl.closeDialog(data);
    })
  }

  close(): void {
    const data = { reload: false };
    this.dialogRemoteControl.closeDialog(data);
  }
}
