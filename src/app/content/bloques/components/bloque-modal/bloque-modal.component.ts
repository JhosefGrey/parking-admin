import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogRemoteControl } from '@ng-vibe/dialog';
import { BloqueCrear } from '../../models/bloque';
import { BloqueService } from '../../services/bloque.service';

@Component({
  selector: 'app-bloque-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bloque-modal.component.html',
  styleUrl: './bloque-modal.component.scss'
})
export class BloqueModalComponent {
  dialogRemoteControl: DialogRemoteControl = inject(DialogRemoteControl);

  esEditar: boolean = false;
  id: string = '';


  obj: BloqueCrear = {
    codigo: ''
  }

  constructor(private _service: BloqueService) { }

  ngOnInit(): void {
    const { esEditar, id } = this.dialogRemoteControl.payload;

    this.esEditar = esEditar;

    if (this.esEditar) {
      this.id = id;
      this.getById(id);
    }
  }

  getById(id: string) {
    this._service.getById(id).subscribe((res) => {
      this.obj.codigo = res.codigo
    })
  }

  save(): void {

    if (!this.esEditar) {
      this._service.create(this.obj).subscribe(() => {
        const data = { reload: true };
        this.dialogRemoteControl.closeDialog(data);
      })
    } else {
      this._service.update({ codigo: this.obj.codigo, idBloque: this.id }).subscribe(() => {
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
