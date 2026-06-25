import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReviewUser } from '../../../molecules/cards/review-user/review-user';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../../../services/orders-service';
import { RatingsService } from '../../../../services/ratings-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-write-review',
  imports: [ReviewUser, RouterLink, ReactiveFormsModule],
  templateUrl: './write-review.html',
  styleUrl: './write-review.css',
})
export class WriteReview {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  valor: number = 0;
  pedido: any = {};
  ordersService = inject(OrdersService);
  ratingsService = inject(RatingsService);

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute) {
    this.miForm = new FormGroup({
      comentario: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    }, []);
  }

  get comentario() {
    return this.miForm.get('comentario');
  }

  ngOnInit() {
    /*TODO: ¿preguntar si hay que cargar datos de la valoración si ya existe? */
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log(id);

    this.ordersService.getAllDataOrderById(Number(id)).subscribe({
      next: (data) => {
        console.log(data);
        this.pedido = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.mensaje = err;
        return;
      }
    });
  }

  loadData() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
    if (this.valor === 0) {
      this.mensaje = 'Debe elegir un número de estrellitas';
      return;
    }
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const user = JSON.parse(usuarioString);

      this.miForm.value.articulos_id = this.pedido.articulos_id;
      this.miForm.value.puntuacion = this.valor;
      this.miForm.value.mensaje = this.miForm.value.comentario;
      this.miForm.value.usuario_valorador_id = user.id;

      this.ratingsService.insertRating(this.miForm.value).subscribe({
        next: (data) => {
          console.log(data);
          if (data.mensaje === 'Valoración creada correctamente') {
            Swal.fire('Enviado!', '', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        },
        error: (err) => {
          console.error(err);
          this.mensaje = err;
          return;
        }
      });

    }


    /*
    {
  "usuario_valorador_id": 3,
  "articulos_id": 12,
  "puntuacion": 4.5,
  "mensaje": "Muy buen estado y trato excelente."
}
    */
  }
  pasarDato(valor: number) {
    this.valor = valor;
  }
}
