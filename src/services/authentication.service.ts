import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, pipe } from 'rxjs';

export interface User {
  firstname: string,
  lastname: string,
  email: string
}

export interface statusResponse {
    get: string,
    parameters: Array<any>
    errors: Array<any>
    results: number
    paging: {
    current: number
    total: number
    }
    response: {
    account: {
    firstname: string
    lastname: string
    email: string
    }
    subscription: {
    plan: string
    end: string
    active: boolean
    }
    requests: {
    current: number
    limit_day: number
    }
  }
}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private api_key: string = '';
  private autentication_url = 'https://v3.football.api-sports.io/status';

  private isLogged = false;
  private user?: User | null;

  constructor(private http: HttpClient) { }

  public validateKey(key: string): Observable<statusResponse> {
    const headers = {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': key
    };

    return this.http.get<statusResponse>(this.autentication_url,  { headers });
  }

  logout(): void {
    this.isLogged = false;
  }

  login(): void {
    this.isLogged = true;
  }

  isAuthenticated() {
    return this.isLogged;
  }

  setKey(key: string): void {
    this.api_key = key;
  }

  getKey(): string {
    return this.api_key
  }
}
