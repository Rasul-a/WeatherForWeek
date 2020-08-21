import { Component, OnInit } from '@angular/core';
import { WeatherResponse } from './weatherResponse';
import { LocationService } from './location.service';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  response: WeatherResponse=null;
  city: string ="";
  date = new Date;
  query: string="";
  deniedLoc: boolean=false;
  cityNotFound: boolean = false;
  errorFound: boolean = false;
  
  
  constructor(private http: HttpClient, private locationService: LocationService, private weatherSevice: WeatherService){}

  ngOnInit(): void {   
     // this.getWeatherByCity("Москва");
      this.getCurrentWeather();
  }
  
  getWeatherByCity(city:string=this.query) {
    if (city == "")
      return;

    this.locationService.getLocByName(city).subscribe(v => {
      this.weatherSevice.getWeatherByPosition({ latitude: v.latitude, longitude: v.longitude })
        .subscribe(data =>{ this.response = data})
      this.city = v.name;
      this.errorFound = this.cityNotFound = false;
    }, (e) => {
      console.log("getWeatherByCity", e)
      if (e.message === "city not found")
        this.cityNotFound = true;
      else
        this.errorFound = true;
    });
  }

  getCurrentWeather():void {
    
    let locTimer=setTimeout(() => {
      console.log("timeout");
      this.getWeatherByCity("Москва");
    }, 2500);
    this.locationService.getCurrentLoc().subscribe(v => {
      clearTimeout(locTimer);
      this.weatherSevice.getWeatherByPosition(v)
        .subscribe(data => { this.response = data; });
      this.locationService.getNameByLocation(v)
        .subscribe(data => {
          this.city = (data.display_name as string).split(',')[0]
        },
          e => console.log("error", e));
      console.log(v);
    }, (e)=>{this.deniedLoc=true;  });
  }
  
}
