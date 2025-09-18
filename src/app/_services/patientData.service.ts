import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment.development";
import { Pd } from '../_models/pd'; 


@Injectable({
    providedIn: 'root'
})
export class PatientDataService {
    private baseUrl = environment.apiUrl;
    http = inject(HttpClient);
    

    uploadPatient(Patient: Pd): Observable<string> 
    { return this.http.post<string>(this.baseUrl + "requiredEOA", Patient, {responseType: 'text' as 'json'});
    }

    
}