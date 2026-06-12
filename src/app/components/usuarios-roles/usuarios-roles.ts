import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Buscador } from '../../shared/buscador/buscador';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users-service';
import { IUsuario } from '../../interfaces/i-usuario';

@Component({
  selector: 'app-usuarios-roles',
  imports: [Buscador,RouterLink],
  templateUrl: './usuarios-roles.html',
  styleUrl: './usuarios-roles.css',
})
export class UsuariosRoles {
  mensaje: string = '';
  tipo: boolean = false;
  usuarios: IUsuario[] = [];
  usersService = inject(UsersService);
  iniciales:string='';

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(){
    this.usersService.getAllUsers().subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        console.log(data);
        this.usuarios = data;
        this.cd.detectChanges();
      }
    });
  }
}
