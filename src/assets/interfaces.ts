export interface User {
  firstname: string;
  lastname: string;
  email: string;
}

export interface statusResponse {
  get: string;
  parameters: Array<any>;
  errors: Array<any>;
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: {
    account: User;
    subscription: {
      plan: string;
      end: string;
      active: boolean;
    };
    requests: {
      current: number;
      limit_day: number;
    };
  };
}

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface Birth {
  date: string;
  place: string;
  country: string;
}

export interface Player {
  [x: string]: any;
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: Birth;
  nationality: string;
  height: string;
  weight: string;
  injured: boolean;
  photo: string;
}

export interface Statistics {
  league: League;
  team: Team;
  form: string;
  fixtures: {
    played: FixturesData;
    wins: FixturesData;
    draws: FixturesData;
    loses: FixturesData;
  };
  goals: {
    for: GoalsData;
    against: GoalsData;
  };
  lineups: Lineup[];
  [x: string]: any;
}

export interface Lineup {
  fomation: string;
  played: number;
}

export interface GoalsData {
  total: Goals;
  average: GoalsAverage;
  minute: GoalsPerMinute;
}

export interface Goals extends FixturesData {}

export interface GoalsAverage {
  home: string;
  away: string;
  total: string;
}

export interface GoalsPerMinute {
  [x: string]: {
    total: number;
    percentage: string;
  };
}

export interface FixturesData {
  home: number;
  away: number;
  total: number;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

export interface LeagueList {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface Team {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
}
