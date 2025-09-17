import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../_services/product.service';
import { valveSize } from '../_models/valveSize';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-valve-sizes',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './valve-sizes.component.html',
  styleUrl: './valve-sizes.component.css'
})
export class ValveSizesComponent implements OnInit {
  constructor(private toastr: ToastrService) { }

  router = inject(Router);
  proc = inject(ProductService);
  selectedValveTypeId = 0;
  valveSizes: Array<valveSize> = [];
  requiredEOA: string = "";
  PPMSeverity: string = "";


  ngOnInit(): void {
    this.selectedValveTypeId = this.proc.selectedValveTypeId();
    this.requiredEOA = this.proc.requiredEOA();


    // get the sizes for the selected valve type
    this.proc.getListOfValveSizes(this.selectedValveTypeId).subscribe({
      next: response => {
        this.valveSizes = response;
        // sort this list by Size
        this.valveSizes = this.valveSizes.sort((a, b) => a.Size - b.Size);
        // for each valve size calculate the PPM
        for (let vs of this.valveSizes) {
          let help = this.calculatePPM(vs);
          
          if (help < 65) { vs.PPM = "severe"; }
          else if (help >= 65 && help < 100) { vs.PPM = "moderate"; }
          else { vs.PPM = "none"; }
        };
      },
      error: error => {
        console.log(error);
        this.toastr.error('Problem retrieving valve sizes');
      }
    });
  }

  calculatePPM(x: valveSize): number {
    let eoa = parseFloat(this.requiredEOA);
    let size = x.EOA;
    let ratio = (size / eoa) * 100;
    return ratio
  }

  severePPM(inp: string) { if (inp === 'severe') { return true } else { return false } }
  nonePPM(inp: string) { if (inp === 'none') { return true } else { return false } }
  moderatePPM(inp: string) { if (inp === 'moderate') { return true } else { return false } }


  
  getDetails(x: valveSize) {
    this.proc.valveSize.set(x);
    this.proc.selectedValveTypeId.set(x.VTValveTypeId);
    this.router.navigate(['/valve-details']) }
  onSubmit() { this.router.navigate(['/valveList'])}
}
