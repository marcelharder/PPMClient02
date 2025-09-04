import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment.development";
import { Pd } from "../_models/pd";
import { DropItem } from "../_models/dropItem";

@Injectable({
  providedIn: "root",
})
export class dropDownService {
  private baseUrl = environment.apiUrl;
  http = inject(HttpClient);

  getImplantedOptions() {
    return this.http.get<DropItem[]>(this.baseUrl + "options_implanted");
  }
  getValveLocationOptions() {
    return this.http.get<DropItem[]>(this.baseUrl + "options_valve_location");
  }
  getValveTypeOptions() {
    return this.http.get<DropItem[]>(this.baseUrl + "options_valve_type");
  }
  getRoleOptions() {
    return this.http.get<DropItem[]>(this.baseUrl + "options_role");
  }
  getCompanyOptions() {
    return this.http.get<DropItem[]>(this.baseUrl + "options_companies");
  }
  getAllHospitals() {
    return this.http.get<DropItem[]>(this.baseUrl + "allHospitals");
  }
  
}
