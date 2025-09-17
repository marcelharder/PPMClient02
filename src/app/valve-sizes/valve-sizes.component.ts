import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../_services/product.service';
import { valveSize } from '../_models/valveSize';

@Component({
  selector: 'app-valve-sizes',
  standalone: true,
  imports: [],
  templateUrl: './valve-sizes.component.html',
  styleUrl: './valve-sizes.component.css'
})
export class ValveSizesComponent implements OnInit {
  constructor(private toastr: ToastrService) { }

  router = inject(Router);
  proc = inject(ProductService);
  selectedValveTypeId = 0;
  valveSizes: Array<valveSize> = []

  ngOnInit(): void {
    this.selectedValveTypeId = this.proc.selectedValveTypeId();
    debugger;
    // get the sizes for the selected valve type
    this.proc.getListOfValveSizes(this.selectedValveTypeId).subscribe({
      next: response => {
        this.valveSizes = response;
        debugger;
      },
      error: error => {
        console.log(error);
        this.toastr.error('Problem retrieving valve sizes');
      }
    });
  }
}
