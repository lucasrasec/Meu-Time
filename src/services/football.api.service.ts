import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class FootballApiService {
  private url = 'https://v3.football.api-sports.io/';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  getCountries() {
    const url = `${this.url}countries`;
    const key = this.authService.getKey();
    const headers = {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': key,
    };
    return this.http.get(url, { headers });
  }

  getSeasons() {
    const url = `${this.url}leagues/seasons`;
    const key = this.authService.getKey();
    const headers = {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': key,
    };
    return this.http.get(url, { headers });
  }

  getLeague(country: string) {
    const url = `${this.url}leagues`;
    const key = this.authService.getKey();
    const headers = {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': key,
    };
    return this.http.get(url, {
      headers,
      params: {
        country,
      },
    });
  }

  getTeams(league: number, season: number) {
    const url = `${this.url}teams`;
    const key = this.authService.getKey();
    const headers = {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': key,
    };
    return this.http.get(url, {
      headers,
      params: {
        league,
        season,
      },
    });
  }

  getPayers(team: number, league: number, season: number) {
    const url = `${this.url}players`;
    const key = this.authService.getKey();
    const headers = {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': key,
    };
    return this.http.get(url, {
      headers,
      params: {
        league,
        season,
        team,
      },
    });
  }

  getStatistics(team: number, league: number, season: number) {
    const url = `${this.url}statistics`;
    const key = this.authService.getKey();
    const headers = {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': key,
    };
    return this.http.get(url, {
      headers,
      params: {
        league,
        season,
        team,
      },
    });
  }
}
