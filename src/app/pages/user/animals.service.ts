import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, tap } from "rxjs";
import { IAnimal } from "src/app/interfaces/IPigRecord";
import { environment } from "src/environments/environment.development";


@Injectable({
    providedIn: 'root'
})

export class AnimalService {

    private animals: ReplaySubject<IAnimal[]> = new ReplaySubject<IAnimal[]>(1);

    constructor(private _httpClient: HttpClient) {

    }

    get animals$(): Observable<IAnimal[]> {
        return this.animals.asObservable()
    }
    //NON FUNZIONANTE
    getAnimals(): Observable<{ data: IAnimal[] }> {
        return this._httpClient.post<{ data: IAnimal[] }>(environment.baseUrl + 'v1/animals/search', {}).pipe(
            tap(response => this.animals.next(response.data))
        )
    }
    //NON FUNZIONANTE
    saveAnimal(data: IAnimal): Observable<any> {
        return this._httpClient.put<{ data: IAnimal[] }>(environment.baseUrl + 'v1/animals/search', data);
    }

}

