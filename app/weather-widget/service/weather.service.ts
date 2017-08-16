import { Injectable } from '@angular/core';
import { Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { FORECAST_KEY, FORECAST_ROOT, GOOGLE_ROOT, GOOGLE_CODING_API } from '../constants/constants';

@Injectable()
export class WeatherService {

    constructor(private jsonp: Jsonp, private http: Http) { }

    getCurrentLocation(): Observable<any> {
        if (navigator.geolocation) {
            return Observable.create(observer => {
                navigator.geolocation.getCurrentPosition(pos => {
                    observer.next(pos)
                }),
                    error => {
                        return Observable.throw(error);
                    }
            });

        } else {
            return Observable.throw("Geolocation is not available");
        }
    }

    getCurrentWeather(lat: number, long: number): Observable<any> {
        const url = FORECAST_ROOT + FORECAST_KEY + "/" + lat + "," + long;
        const queryParams = "?callback=JSONP_CALLBACK";

        return this.jsonp.get(url + queryParams)
            .map(data => data.json())
            .catch(err => {
                console.error("Unable to get weather data - 0", err);
                return Observable.throw(err.json());
            });
    }

    getLocationName(lat: number, long: number): Observable<any>{
        const url = GOOGLE_ROOT;
        const queryParams = "?latlng=" + lat + "," + long + "&key=" + GOOGLE_CODING_API;

        return this.http.get(url + queryParams)
        .map(loc => loc.json())
        .catch(err => {
            console.error("Unable to get location - ", err);
            return Observable.throw(err);
        })
    }


}