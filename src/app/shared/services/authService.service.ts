import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../environments/environments";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { tap } from "rxjs";

interface StravaTokenResponse {
    token_type: string,
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    access_token: string;
    athelete: any;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private accessToken = signal<string>('')

    private httpClient = inject(HttpClient)

    private redirectUri = environment.REDIRECT_URI;
    private clientId = environment.STRAVA_CLIENT_ID
    private clientSecret = environment.STRAVA_CLIENT_SECRET;

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

    exchangeCodeForToken(code: string){
        const body = new HttpParams()
        .set('client_id', this.clientId)
        .set('client_secret', this.clientSecret)
        .set('code', code)
        .set('grant_type', 'authorization_code')

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })

        return this.httpClient.post<StravaTokenResponse>('https://www.strava.com/oauth/token', body.toString(), { headers}).pipe(
            tap({
                next: (response) => this.accessToken.set(response.access_token),
                error: (error) => console.log('Error exchanging auth code for access token', error)
            })
        )
    }

    get token(){
        return this.accessToken()
    }
}