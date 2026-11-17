import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [ReactiveFormsModule] 
})
export class LoginPage {
  private authService = inject(Auth);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  loading = signal(false);
  error = signal<string | null>(null);

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { password, username } = this.loginForm.getRawValue();
    
    this.authService.login(username!, password!).subscribe({
      next: () => { 
        this.loading.set(false);
        console.log("Listo");
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(
          error.status === 401 
            ? 'Usuario o contraseña incorrecta' 
            : 'No se puede conectar, espere más tarde'
        );
      }
    });
  }
}