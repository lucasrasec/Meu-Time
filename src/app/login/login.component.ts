import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, catchError, finalize, take, tap } from 'rxjs';
import { AuthenticationService, User } from 'src/services/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  api_key = new FormControl<string>('');

  loading = false;

  constructor(private authService: AuthenticationService, private router: Router, private snackBar: MatSnackBar) {}

  login() {
    this.loading = true;
    this.authService.validateKey(this.api_key.value as string)
    .pipe(take(1), finalize(() => this.loading = false))
    .subscribe(data => {
      if (data.errors && !data.response.account) {
        this.snackBar.open('Erro na autenticação da chave, verificar a procedencia da mesma', '', { duration: 3000 })
      } else {
        this.authService.login(data.response.account, this.api_key.value as string);
        this.router.navigate(['/home']);
      }
    });
  }
}
