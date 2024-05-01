import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedStateService {

    public actionRequired: any;

    constructor() { }

    private appStateSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});

    setAppState(newState: any) {
        this.appStateSubject.next(newState);
    }

    getAppState(): Observable<any> {
        return this.appStateSubject.asObservable();
    }
}
