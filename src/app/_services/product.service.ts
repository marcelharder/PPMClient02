import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { TypeOfValve } from '../_models/TypeOfValve';
import { valveSize } from '../_models/valveSize';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = environment.apiUrl;
    http = inject(HttpClient);
    valveList = signal<TypeOfValve[]>([]);
    getSelectedValveTypeId = signal(0);
    valveSizeList = signal<valveSize[]>([]);



    getProductsByVTP(v: number, t: string, p: string): Observable<TypeOfValve[]> {
        return this.http.get<TypeOfValve[]>(this.baseUrl + 'productsByVTP/' + v + '/' + t + '/' + p);
    }
    getValveSizes(): Observable<valveSize[]> {
        return this.http.get<valveSize[]>(this.baseUrl + 'valveSizes');
    }
    getListOfValveSizes(id: number) {
        this.http.get<valveSize[]>(this.baseUrl + 'valveSizesByTypeOfValveId/' + id).subscribe({
            next: response => {
                this.valveSizeList.set(response);
            },
            error: error => {
                console.log(error);
            }
        });

    }
}