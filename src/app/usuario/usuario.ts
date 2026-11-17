import { Component, inject } from '@angular/core';
import { Auth } from '../services/auth';

@Component({
  imports: [],
  selector: 'app-usuario',
  styleUrl: './usuario.css',
  templateUrl: './usuario.html',
})
export class Usuario {
  protected auth = inject(Auth);
}
