import { Component, inject, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { TypeOfValve } from '../_models/TypeOfValve';
import { valveSize } from '../_models/valveSize';

@Component({
  selector: 'app-valve-details',
  standalone: true,
  imports: [],
  templateUrl: './valve-details.component.html',
  styleUrl: './valve-details.component.css'
})
export class ValveDetailsComponent implements OnInit, OnChanges {
  router = inject(Router);
  ImagePath: string = "";
  product = inject(ProductService);
  advice = "Not implemented yet";
  selectedValve: TypeOfValve = {
    No: 0, uk_code: "", us_code: "", Description: "", Valve_size: [], Type: "", image: "",
    ValveTypeId: 0,
    Vendor_description: '',
    Vendor_code: '',
    Model_code: '',
    Implant_position: '',
    countries: ''
  };
  selectedValveSize: valveSize = { SizeID: 0, VTValveTypeId: 0, Size: 0.0, PPM: "", EOA: 0.0  };
  listOfValves: TypeOfValve[] = [];
  listSizes: valveSize[] = [];

  ngOnInit() {
    let id = this.product.selectedValveTypeId()
    this.listOfValves = this.product.valveList();

    this.selectedValveSize = this.product.valveSize();
    if (!this.selectedValveSize) { console.error('Selected valve size not found'); return; }

    let selectedValve = this.listOfValves.find(v => v.ValveTypeId === id);
    if (!selectedValve) { console.error('Selected valve not found'); return; }
    this.selectedValve = selectedValve;
    this.ImagePath = this.selectedValve.image;

  }

  ngOnChanges() {
    this.ImagePath = this.selectedValve.image;
  }



  onSubmit() {
    this.router.navigate(['/valve-sizes']);
  }

}
