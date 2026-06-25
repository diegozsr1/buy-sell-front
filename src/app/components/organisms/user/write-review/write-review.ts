import { ChangeDetectorRef, Component } from '@angular/core';
import { ReviewUser } from '../../../molecules/cards/review-user/review-user';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  valor:number=0;

  constructor(private cd: ChangeDetectorRef) {
    this.miForm = new FormGroup({
      comentario: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    }, []);
  }

  get comentario() {
    return this.miForm.get('comentario');
  }

  loadData() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
  }
  pasarDato(valor: number) {
    this.valor=valor;
  }
}
