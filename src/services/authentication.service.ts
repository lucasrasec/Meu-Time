import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, statusResponse } from 'src/assets/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private api_key: string = '';
  private autentication_url = 'https://v3.football.api-sports.io/status';

  private isLogged = false;
  private user!: User;

  constructor(private http: HttpClient) {}

  public validateKey(key: string): Observable<statusResponse> {
    const headers = {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': key,
    };

    return this.http.get<statusResponse>(this.autentication_url, { headers });
  }

  logout(): void {
    this.isLogged = false;
    this.user = {} as User;
    localStorage.removeItem('loggedUser');
  }

  login(user: User, key: string): void {
    this.isLogged = true;
    this.user = user;
    this.setKey(key);

    const userInfo = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      key: key,
    };

    localStorage.setItem('loggedUser', JSON.stringify(userInfo));
  }

  isAuthenticated() {
    const localInfo = localStorage.getItem('loggedUser');
    if (!localInfo) {
      return this.isLogged;
    }

    const userInfo = JSON.parse(localInfo);

    this.api_key = userInfo.key;

    this.user = {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
    };

    this.isLogged = true;

    return this.isLogged;
  }

  setKey(key: string): void {
    this.api_key = key;
  }

  getKey(): string {
    return this.api_key;
  }

  getUser(): User {
    return this.user;
  }
}
