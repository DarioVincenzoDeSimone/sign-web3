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
    // //NON FUNZIONANTE
    // getAnimals(): Observable<{ data: IAnimal[] }> {
    //     return this._httpClient.post<{ data: IAnimal[] }>(environment.baseUrl + 'v1/animals/search', {}).pipe(
    //         tap(response => this.animals.next(response.data))
    //     )
    // }

    getAnimals(): Observable<any> {
        let body = {}
        return this._httpClient.post(environment.baseUrl + 'v1/users/search', body).pipe(
            tap(response => {
                let animalList: IAnimal[] = response.data.map(r => r.animals)[0];
                this.animals.next(animalList)
            })
        );
    }

    saveAnimal(data: IAnimal): Observable<any> {
        return this._httpClient.post<{ data: IAnimal[] }>(environment.baseUrl + 'v1/animals', data);
    }

}

