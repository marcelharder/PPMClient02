import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { TypeOfValve } from '../_models/TypeOfValve';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = environment.apiUrl;
    http = inject(HttpClient);
    valveList = signal<TypeOfValve[]>([]);
  
    

    getProductsByVTP(v:number,t:string,p:string): Observable<TypeOfValve[]> 
    { return this.http.get<TypeOfValve[]>(this.baseUrl + 'productsByVTP/' + v + '/' + t + '/' + p);
    }



    
}