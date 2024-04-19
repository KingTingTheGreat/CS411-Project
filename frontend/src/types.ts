export type User = {
	id: string;
	username: string;
	email: string;
	firstname: string;
	lastname: string;
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

export interface Mountain {
    name: string;
    region: string;
    country: string;
    href: string;
    liftsOpen: number;
}
