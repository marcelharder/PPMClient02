import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Pd } from '../_models/pd'; 


@Injectable({
    providedIn: 'root'
})
export class PatientDataService {
    private baseUrl = environment.apiUrl;
    http = inject(HttpClient);
    

    uploadPatient(Patient: Pd): Observable<Pd> 
    { return this.http.post<Pd>(this.baseUrl, Patient, {responseType: 'text' as 'json'});
    }

    
}