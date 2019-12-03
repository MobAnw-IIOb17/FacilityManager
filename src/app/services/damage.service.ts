import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Damage} from '../model/damage.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class DamageService {

    constructor(protected httpClient: HttpClient) {
    }

    getDamages() {
        return this.httpClient.get<Damage[]>(`../assets/damage-list.json`);
    }

    public getDamagesById(id: number): Observable<Damage> {
        return this.httpClient.get<Damage>(`../assets/damage-list.json/${id}`).pipe(
            map(data => new Damage().deserialize(data)),
            catchError(() => throwError('User not found'))
        );
    }
}
