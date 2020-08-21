import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pos } from "./Pos";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getCurrentLoc(): Observable<Pos> {
    return new Observable(obs=>{
      navigator.geolocation.getCurrentPosition((pos)=>{
        //console.log("getCurrentLoc",pos);
        
        obs.next({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
        obs.complete();
      },(e)=>{
        obs.error(e);
       // console.log("er",e)
        obs.complete();
      },{timeout: 10000}) 
    })
  };

  getLocByName(city: string): Observable<any> {
    return this.http.get<any>("https://nominatim.openstreetmap.org/search?format=json&addressdetails=1", { params: new HttpParams().set("q", city) }).pipe(map(data => {
      if (data.length == 0)
        throw new Error("city not found");
     // console.log("getLocByName",data);
      
      return {
        latitude: data[0].lat,
        longitude: data[0].lon,
        name: (data[0].display_name as string).split(',').slice(0, 2).toString()
      }
    }))
  }

  getNameByLocation(pos: Pos): Observable<any> {
    return this.http.get<any>("https://nominatim.openstreetmap.org/reverse?format=json&zoom=10&addressdetails=1", { params: new HttpParams().set("lat", pos.latitude.toString()).set("lon", pos.longitude.toString()) })
  }


}
