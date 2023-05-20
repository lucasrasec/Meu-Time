import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, catchError, take, tap } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  api_key = new FormControl('');

  constructor(private authService: AuthenticationService, private router: Router) {}

  login() {
    this.authService.validateKey(this.api_key.value as string)
    .pipe(
      tap((data) => {
        localStorage.setItem('loggedUser', data.response.account.toString());
        this.authService.login();
        this.router.navigate(['/home']);
      }),
      catchError((error) => {
        alert('Erro ao tentar validar a chave: ');
        return EMPTY;
      }),
      take(1)
    )
    .subscribe();
  }
}
