import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Icon } from '../../components/atoms/icon/icon';

@Component({
  selector: 'app-user-form-component',
  imports: [ReactiveFormsModule, RouterLink, Icon],
  templateUrl: './user-form-component.component.html',
  styleUrl: './user-form-component.component.css',
})
export class UserFormComponentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);

  userID = '';
  iniciales = 'MG';
  mensaje = '';
  tipo = false;

  // Previsualización de la foto seleccionada (solo cliente; la subida real depende del backend)
  fotoPreview: string | null = null;

  miForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    biografia: new FormControl(''),
  });

  get username() { return this.miForm.get('username'); }
  get email() { return this.miForm.get('email'); }
  get telefono() { return this.miForm.get('telefono'); }
  get ubicacion() { return this.miForm.get('ubicacion'); }

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['userID'] ?? '';

    // Precarga mock segun Figma. TODO: cablear users-service para datos reales del usuario.
    this.miForm.patchValue({
      username: 'manuelg',
      email: 'manuelg@correo.com',
      telefono: '+34 600 123 456',
      ubicacion: 'Madrid',
      biografia: 'Vendo tecnología que cuido. Trato cercano y envío rápido.',
    });

    const u = localStorage.getItem('usuarioBuy&Sell');
    if (u) {
      const user = JSON.parse(u);
      if (user?.iniciales) this.iniciales = user.iniciales;
    }
  }

  // Selección de foto: abre el explorador y previsualiza la imagen elegida (cliente).
  // TODO: subir el fichero al backend (photos/users) cuando haya conexión.
  onFotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.fotoPreview = reader.result as string;
      this.cd.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  guardarCambios(): void {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      this.tipo = false;
      this.mensaje = 'Revisa los campos marcados';
      return;
    }
    // TODO: cablear users-service.update(userID, this.miForm.value) -> PUT al backend.
    // Mientras el backend (localhost:3000) no esté levantado, esto no persiste.
    this.tipo = true;
    this.mensaje = 'Cambios validados correctamente (pendiente de conexión con el backend para guardar)';
    this.cd.detectChanges();
  }
}
