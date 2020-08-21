
 export class Current {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    wind_speed: number;
    description: string;
    icon: string;
}

export class Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export class Daily {
    dt: number;
    temp: Temp;
    pressure: number;
    humidity: number;
    wind_speed: number;
    description: string;
    icon: string;
}

export class WeatherResponse {
    current: Current;
    daily: Daily[];
}


