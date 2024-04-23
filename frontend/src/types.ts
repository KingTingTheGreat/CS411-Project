export type User = {
  id: string;
  email: string;
  favorites: string[];
};

export interface ApiResponse {
    data: ResortApiData[];  // Assuming `data` is the key that contains the resort array
}

export interface ResortApiData {
    name: string;
    region: string;
    country: string;
    href: string;
    units: string;
    location: Location;
    lifts: Lifts;
    conditions: Conditions;
    weather: WeatherForecast;
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface Lifts {
    status: { [key: string]: string };  // Status of each lift
    stats: LiftStats;
}

export interface LiftStats {
    open: number;
    hold: number;
    scheduled: number;
    closed: number;
    percentage: Percentage;
}

export interface Percentage {
    open: number;
    hold: number;
    scheduled: number;
    closed: number;
}

export interface Conditions {
    base: number;
    season: number;
    twelve_hours: number;
    twentyfour_hours: number;
    fortyeight_hours: number;
    seven_days: number;
}

export interface WeatherForecast {
    location: Location;
    current: Current;
    forecast: Forecast;
}

export interface Location {
    name: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
    tzID: string;
    localtime: string;
}

export interface Current {
    lastUpdated: string;
    tempF: number;
    isDay: number;
    condition: Condition;
    windMph: number;
    humidity: number;
    precipIn: number;
    cloud: number;
    feelsLikeF: number;
}

export interface Forecast {
    forecastDay: ForecastDay[];
}

export interface ForecastDay {
    date: string;
    day: Day;
}

export interface Day {
    maxTempF: number;
    minTempF: number;
    avgTempF: number;
    maxWindMph: number;
    totalPrecipIn: number;
    totalSnowCm: number;
    dailyChanceOfRain: number;
    dailyChanceOfSnow: number;
    condition: Condition;
    uv: number;
}

export interface Condition {
    text: string;
    icon: string;
    code: number;
}


export interface Mountain {
    name: string;
    region: string;
    country: string;
    href: string;
    //liftsOpen: number;
    units: string;
    location: Location;
    lifts: Lifts;
    conditions: Conditions;
    weather: WeatherForecast;
}

export interface MountainShort {
    id: number;
    name: string;
    region: string;
    country: string;
}


