import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../_services/product.service';
import { valveSize } from '../_models/valveSize';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-valve-sizes',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './valve-sizes.component.html',
  styleUrl: './valve-sizes.component.css'
})
export class ValveSizesComponent implements OnInit {
  constructor(private toastr: ToastrService) { }

  router = inject(Router);
  proc = inject(ProductService);
  selectedValveTypeId = 0;
  valveSizes: Array<valveSize> = [];
  requiredEOA = 0.0;

  ngOnInit(): void {
    this.selectedValveTypeId = this.proc.selectedValveTypeId();
    this.requiredEOA = this.proc.requiredEOA();
    
    // get the sizes for the selected valve type
    this.proc.getListOfValveSizes(this.selectedValveTypeId).subscribe({
      next: response => {
        this.valveSizes = response;
        for (let vs of this.valveSizes){
          this.calculatePPM(vs);
        };
        
      },
      error: error => {
        console.log(error);
        this.toastr.error('Problem retrieving valve sizes');
      }
    });
  }

  calculatePPM(x: valveSize){
    // calculate if the valve size is ok for the patient
    let eoa = x.EOA;
    let ppm = Math.round((1.1 / eoa) * 10000) / 10; // PPM = 1.1 / EOA * 10000
    x.PPM = ppm.toString();
    if (ppm > this.requiredEOA){
      x.PPM = ppm.toString() + ' (too high)';
    } else {
      x.PPM = ppm.toString() + ' (OK)';
    }
  }

  Cancel(){}
  getDetails(x: valveSize){}
  onSubmit() { }
}
