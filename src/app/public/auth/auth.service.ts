import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { LocalforageService } from 'src/app/core/services/localforage.service';
import { SharedStateService } from 'src/app/core/services/shared-state.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public authenticated: boolean = false;
    private _baseUrl = environment.base_url;



    constructor(
        private _httpClient: HttpClient,
        private _sharedStateService: SharedStateService,
    ) { }


    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------


    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        sessionStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return sessionStorage.getItem('accessToken') ?? '';
    }




    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    validate(reqData: any): Observable<any> {
        if (this.authenticated) {
            return throwError(() => new Error('User is already logged in.'));
        }
        return this._httpClient.post(`${this._baseUrl}/api/authenticate`, reqData).pipe(
            switchMap((response: any) => {

                if (response.code === 200) {
                    // Store tokens in the session storage     
                    this.accessToken = response.token

                    // Set the authenticated flag to true
                    this.authenticated = true;

                    this._sharedStateService.setAppState({ isLoggedIn: true })
                }

                return of(response);
            })
        );

    }

    /**
     * Sign out
     */
    signOut() {

        // Remove the access token from the session storage        
        sessionStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this.authenticated = false;

        this._sharedStateService.setAppState({ isLoggedIn: false })

    }

    checkUserValidSession(): boolean {
        if (!this.accessToken) {
            this.authenticated = false
        } else {
            this.authenticated = true
        }

        return this.authenticated
    }

}
