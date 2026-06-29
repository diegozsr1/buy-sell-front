import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Icon } from '../../components/atoms/icon/icon';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-user-form-component',
  imports: [ReactiveFormsModule, RouterLink, Icon],
  templateUrl: './user-form-component.component.html',
  styleUrl: './user-form-component.component.css',
})
export class UserFormComponentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);
  private usersService = inject(UsersService);
  private router = inject(Router);

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

    // Precarga real desde el backend (GET /usuarios/:id).
    // NOTA: la tabla usuarios no tiene columnas telefono ni biografia,
    // por eso esos dos campos no se precargan (pendiente de equipo/backend).
    if (this.userID) {
      this.usersService.getUserById(this.userID).subscribe({
        next: (usuario) => {
          if (usuario) {
            this.miForm.patchValue({
              username: usuario.username ?? '',
              email: usuario.email ?? '',
              ubicacion: usuario['zona_geogr\u00e1fica'] ?? usuario.zona_geografica ?? '',
            });
            const ini = `${(usuario.nombre ?? '').charAt(0)}${(usuario.apellidos ?? '').charAt(0)}`.toUpperCase();
            if (ini.trim()) this.iniciales = ini;
          }
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.tipo = false;
          this.mensaje = 'No se han podido cargar los datos del perfil.';
          this.cd.detectChanges();
        }
      });
    }
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
        // El backend hace update parcial: enviamos solo los campos editables que existen
    // en la BBDD. Lo que no enviamos (incluida la password) se conserva.
    // telefono y biografia no se envian: no existen como columnas (pendiente de equipo).
    const body = {
      username: this.miForm.value.username,
      email: this.miForm.value.email,
      zona_geografica: this.miForm.value.ubicacion,
    };

    this.usersService.updateUser(Number(this.userID), body).subscribe({
      next: (usuario) => {
        // Reflejar el username actualizado en el localStorage para el resto de la app
        const u = localStorage.getItem('usuarioBuy&Sell');
        if (u) {
          const userLocal = JSON.parse(u);
          userLocal.username = usuario.username ?? userLocal.username;
          localStorage.setItem('usuarioBuy&Sell', JSON.stringify(userLocal));
        }
        this.tipo = true;
        this.mensaje = 'Perfil actualizado correctamente';
        this.cd.detectChanges();
        setTimeout(() => this.router.navigate(['/user/panel/profile']), 800);
      },
      error: (err) => {
        console.error(err);
        this.tipo = false;
        const backendMsg = err?.error?.detalles?.[0] ?? err?.error?.error;
        this.mensaje = backendMsg ? backendMsg : 'No se ha podido actualizar el perfil';
        this.cd.detectChanges();
      }
    });
  }
}
