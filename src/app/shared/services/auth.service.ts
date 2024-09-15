import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../environments/environments";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { StravaResponseToken } from "../models/strava-response-token.model";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private httpClient = inject(HttpClient)

    private accessToken = signal<string>('')

    private redirectUri = environment.REDIRECT_URI;
    private clientId = environment.STRAVA_CLIENT_ID
    private clientSecret = environment.STRAVA_CLIENT_SECRET;

    // Method to redirect the user to the Strava authorization page
    goToStravaAuthPage(){
        const scope = 'activity:read_all'
        const baseUrl = 'https://www.strava.com/oauth/authorize'

        const queryParams = new URLSearchParams({
            response_type: 'code',
            client_id: this.clientId,
            scope: scope,
            redirect_uri: this.redirectUri
        })

        window.location.href = `${baseUrl}?${queryParams.toString()}`
    }

    // Method to exchange the authorization code for an access token
    exchangeCodeForToken(code: string){
        const body = new HttpParams()
        .set('client_id', this.clientId)
        .set('client_secret', this.clientSecret)
        .set('code', code)
        .set('grant_type', 'authorization_code')

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })

        return this.httpClient.post<StravaResponseToken>('https://www.strava.com/oauth/token', body.toString(), { headers}).pipe(
            tap({
                next: (response) => this.accessToken.set(response.access_token),
                error: (error) => console.log('Error exchanging auth code for access token', error)
            })
        )
    }

    // Getter for retrieving the access token
    get token(){
        return this.accessToken()
    }
}