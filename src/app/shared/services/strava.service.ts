import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, concatMap, Observable, of } from "rxjs";
import { Activity } from "../models/activity.model";

@Injectable({
    providedIn: 'root'
})
export class StravaService {
    private http = inject(HttpClient)

    // Method to fetch activities from Strava's API
    fetchActivites(){
        const cachedRuns = sessionStorage.getItem('strava_runs');
        if(cachedRuns){
            console.log('Using cached Activities')
            return of(JSON.parse(cachedRuns))
        }

        const perPage = 100;
        let page = 1;
        let allActivities: Activity[] = [];

        const fetchPage = (): Observable<Activity[]> => {
            return this.http.get<Activity[]>('https://www.strava.com/api/v3/athlete/activities', {
                params: {
                    per_page: perPage,
                    page: page
                }
            }).pipe(
                // Use concatMap to handle sequential API requests and process the response
                concatMap((activities) => {
                    // If there are no more activities to fetch
                    if(activities.length === 0){
                        const allRuns = allActivities.filter((activity) => activity.type === 'Run')
                        sessionStorage.setItem('strava_runs', JSON.stringify(allRuns))
                        return of(allRuns)
                    }
                    allActivities = allActivities.concat(activities);
                    page++;
                    return fetchPage(); // Recursively fetch the next page
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