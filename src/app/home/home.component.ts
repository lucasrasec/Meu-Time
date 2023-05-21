import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { ConfirmationDialogComponent } from '../dialog/confirmation.dialog.component';
import { FootballApiService } from 'src/services/football.api.service';
import { pipe, take } from 'rxjs';
import { Country, LeagueList, Team, User } from 'src/assets/interfaces';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user!: User;

  filtersOpen = false;
  firstOpen = false;

  country_name = '';
  season?: number;
  league = '';
  team = '';

  league_id!: number;
  team_id!: number;

  countries: Country[] = [];
  loadingCountries = true;
  countrySelected = false;

  seasons: number[] = [];
  loadingSeasons = true;
  seasonSelected = false;

  leagues: LeagueList[] = [];
  loadingLeagues = true;
  leagueSelected = false;

  teams: Team[] = [];
  loadingTeams = true;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private footballApi: FootballApiService
  ) {}

  confirmLogout() {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> =
      this.dialog.open(ConfirmationDialogComponent, {
        width: '300px',
        data: 'Deseja mesmo sair?',
      });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.logout();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getCountries() {
    this.footballApi
      .getCountries()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.countries = (data as any).response as Country[];
        this.loadingCountries = false;
      });
  }

  getSeasons() {
    this.footballApi
      .getSeasons()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.seasons = (data as any).response;
        this.loadingSeasons = false;
      });
  }

  getLeagues(country: string) {
    this.footballApi
      .getLeague(country)
      .pipe(take(1))
      .subscribe((data: any) => {
        this.leagues = data.response.map((result: any) => {
          return result.league;
        });
        this.loadingLeagues = false;
      });
  }

  getTeams(league: number, season: number) {
    this.footballApi
      .getTeams(league, season)
      .pipe(take(1))
      .subscribe((data: any) => {
        this.leagues = data.response.map((result: any) => {
          return result.team;
        });
        this.loadingTeams = false;
      });
  }

  toggleFilters() {
    if (!this.firstOpen) this.firstOpen = true;
    this.filtersOpen = !this.filtersOpen;
  }

  toggleCountries() {
    if (!this.country_name) {
      this.countrySelected = false;
      return;
    }
    this.countrySelected = true;
    this.getLeagues(this.country_name);
  }

  disableLeague(): boolean {
    return !!(!this.countrySelected || this.loadingLeagues);
  }

  toggleLeague() {
    if (!this.league) {
      this.leagueSelected = false;
      return;
    }
    this.leagueSelected = true;
    this.verifyCallTeams();
  }

  toggleSeason() {
    if (!this.season) {
      this.seasonSelected = false;
      return;
    }
    this.seasonSelected = true;
    this.verifyCallTeams();
  }

  verifyCallTeams() {
    if (this.season && this.league) {
      const leagueData = this.leagues.filter(
        (league) => league.name === this.league
      );
      this.getTeams(leagueData[0].id, this.season);
    }
  }

  disableTeams() {
    return !!(!this.leagueSelected || this.loadingTeams || !this.season);
  }

  toggleTeam() {
    this.team_id = this.checkDataID(this.team, this.teams);
    this.league_id = this.checkDataID(this.league, this.leagues);
  }

  checkDataID(searchString: string, searchArray: Array<any>) {
    const searchData = searchArray.filter((data) => data.name === searchString);
    if (searchData) {
      return (searchData as any).id;
    }
    return undefined;
  }

  getResources() {
    this.getCountries();
    this.getSeasons();
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getResources();
  }
}
