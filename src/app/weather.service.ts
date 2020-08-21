import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import {WeatherResponse, Daily, Current} from './weatherResponse'
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pos } from './Pos';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherByPosition(pos: Pos):Observable<WeatherResponse>{
    return this.getWeatherByParams(new HttpParams().set('lat', pos.latitude.toString()).set('lon', pos.longitude.toString()))
  }

  private getWeatherByParams(params: HttpParams):Observable<WeatherResponse>{
    
    return this.http.get<any>(environment.api_weather_url,{ params }).pipe(map(data=>{
      let daily:Daily[]=[];
      let res: WeatherResponse=new WeatherResponse();
      let current: Current=new Current();

      data.daily.map(d =>
        daily.push({
          description: d.weather[0].description,
          dt: d.dt,
          humidity: d.humidity,
          icon: d.weather[0].icon,
          pressure: d.pressure,
          temp: d.temp,
          wind_speed: d.wind_speed
        })
      );

      current.description=data.current.weather[0].description;
      current.icon=data.current.weather[0].icon;
      current.feels_like=data.current.feels_like;
      current.humidity = data.current.humidity;
      current.pressure = data.current.pressure;
      current.temp=data.current.temp;
      current.wind_speed=data.current.wind_speed
      current.wind_speed=data.current.wind_speed

      res.daily=daily;
      res.current = current;
      //console.log("daily",res)
      return res;
    }))
  };
}
