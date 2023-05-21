import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';
import { FootballApiService } from 'src/services/football.api.service';
import { finalize, take } from 'rxjs';
import { Player, Statistics } from 'src/assets/interfaces';

const traducoes = {
  played: 'Jogados',
  wins: 'Vitórias',
  draws: 'Empates',
  loses: 'Derrotas',
};

//Mock
const player = [
  {
    id: 276,
    name: 'Neymar',
    firstname: 'Neymar',
    lastname: 'da Silva Santos Júnior',
    age: 28,
    birth: {
      date: '1992-02-05',
      place: 'Mogi das Cruzes',
      country: 'Brazil',
    },
    nationality: 'Brazil',
    height: '175 cm',
    weight: '68 kg',
    injured: false,
    photo: 'https://media.api-sports.io/football/players/276.png',
  },
];

const playeds = {
  home: 19,
  away: 19,
  total: 38,
};

const team = {
  id: 33,
  name: 'Manchester United',
  logo: 'https://media.api-sports.io/football/teams/33.png',
};

const lineups = [
  {
    formation: '4-2-3-1',
    played: 32,
  },
  {
    formation: '3-4-1-2',
    played: 4,
  },
  {
    formation: '3-4-2-1',
    played: 1,
  },
  {
    formation: '4-3-1-2',
    played: 1,
  },
];

const fixtures = {
  played: {
    home: 19,
    away: 19,
    total: 38,
  },
  wins: {
    home: 10,
    away: 8,
    total: 18,
  },
  draws: {
    home: 7,
    away: 5,
    total: 12,
  },
  loses: {
    home: 2,
    away: 6,
    total: 8,
  },
};

const minute = {
  '0-15': { total: 4, percentage: '6.06%' },
  '16-30': { total: 17, percentage: '25.76%' },
  '31-45': { total: 11, percentage: '16.67%' },
  '46-60': { total: 13, percentage: '19.70%' },
};

const DATA_ALERT =
  '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M120 896v-60h480v60H120Zm519.894-290Q561 606 505.5 550.394t-55.5-134.5Q450 337 505.606 281.5t134.5-55.5Q719 226 774.5 281.606t55.5 134.5Q830 495 774.394 550.5t-134.5 55.5ZM120 556v-60h262q5.32 16.323 12.16 31.161Q401 542 409 556H120Zm0 170v-60h419q13.8 6.364 29.4 10.682Q584 681 600 683v43H120Zm500-270h40V296h-40v160Zm20 80q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6Z"/></svg>';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent {
  @Input() team_id?: number;
  @Input() season?: number;
  @Input() league_id?: number;

  //retirar mock
  played = playeds;
  team = team;
  lineups = lineups;
  fixtures = fixtures;
  parsedFixtures: any[] = [];
  minutes = minute;

  displayedColumns: string[] = ['type', 'total'];

  players: Player[] = [];
  loadingPlayers = true;

  statistics!: Statistics;
  loadingStatistics = true;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private footballApi: FootballApiService
  ) {
    iconRegistry.addSvgIconLiteral(
      'data_alert',
      sanitizer.bypassSecurityTrustHtml(DATA_ALERT)
    );
  }

  getPlayers() {
    this.footballApi
      .getPayers(
        this.team_id as number,
        this.league_id as number,
        this.season as number
      )
      .pipe(
        take(1),
        finalize(() => {
          this.loadingPlayers = false;
        })
      )
      .subscribe((data) => {
        this.players = (data as any).response;
      });
  }

  getInformations() {
    this.loadingPlayers = true;
    this.loadingStatistics = true;
    this.getPlayers();
  }

  ngOnChanges(): void {
    if (this.team_id && this.league_id && this.season) {
      this.getInformations();
    }
  }

  parseTableFixtures() {
    this.parsedFixtures = Object.keys(fixtures).map((key) => ({
      type: (traducoes as any)[key],
      ...(fixtures as any)[key],
    }));
  }

  ngOnInit(): void {
    this.parseTableFixtures();
    this.team_id = 1;
    this.season = 1;
    this.players = player;
    this.loadingPlayers = false;
    this.loadingStatistics = false;
  }
}
