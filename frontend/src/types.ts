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
    liftsOpen: number;
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
    current: Current;
    forecast: Forecast;
}

export interface Current {
    last_updated: string;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    humidity: number;
    precip_in: number;
    cloud: number;
    feelslike_f: number;
}

export interface Forecast {
    forecastday: forecastday[];
}

export interface forecastday {
    date: string;
    day: Day;
}

export interface Day {
    maxtemp_f: number;
    mintemp_f: number;
    avgtemp_f: number;
    maxwind_mph: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
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
    liftsOpen: number;
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


