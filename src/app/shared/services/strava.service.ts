import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, concatMap, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StravaService {
    private http = inject(HttpClient)

    fetchActivites(){
        const cachedActivies = sessionStorage.getItem('strava_activities');
        if(cachedActivies){
            console.log('Using cached Activities')
            return of(JSON.parse(cachedActivies))
        }

        const perPage = 100;
        let page = 1;
        let allActivities: any[] = [];

        const fetchPage = (): Observable<any[]> => {
            return this.http.get<any[]>('https://www.strava.com/api/v3/athlete/activities', {
                params: {
                    per_page: perPage,
                    page: page
                }
            }).pipe(
                concatMap((activities) => {
                    if(activities.length === 0){
                        sessionStorage.setItem('strava_activities', JSON.stringify(allActivities))
                        return of(allActivities)
                    }
                    allActivities = allActivities.concat(activities);
                    page++;
                    return fetchPage();
                }),
                catchError((error) => {
                    console.log('Error retrieving activities', error);
                    return of(allActivities)
                })
            )
        };
        return fetchPage();
    }
}