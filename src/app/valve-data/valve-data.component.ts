import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit, signal, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DropItem } from '../_models/dropItem';
import { dropDownService } from '../_services/dropDown.service';
import { ProductService } from '../_services/product.service';
import { TypeOfValve } from '../_models/TypeOfValve';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-valve-data',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDropdownModule, NgFor],
  templateUrl: './valve-data.component.html',
  styleUrl: './valve-data.component.css'
})
export class ValveDataComponent implements OnInit {

  constructor(private toastr: ToastrService) { }
  router = inject(Router);
  drops = inject(dropDownService);
  proc = inject(ProductService);
  selectedValveType: DropItem = { Value: 0, Description: 'Choose' };
  selectedVendor: DropItem = { Value: 0, Description: 'Choose' };
  vendors: DropItem[] = []
  selectedValves: TypeOfValve[] = [];
  requiredEOA: string = "";
  test: number = 0.0;
 


  ValveTypes: DropItem[] = [
    { Value: 0, Description: 'Choose' },
    { Value: 1, Description: 'Mechanical' },
    { Value: 2, Description: 'Biological' }];

  ngOnInit(): void {
    this.test = parseFloat(this.proc.requiredEOA());
    this.requiredEOA = this.test.toFixed(2);
    
    this.loadDrops();
   
    this.selectedValveType = this.ValveTypes[0]; // sets first valve type as default
   
  }

  loadDrops() {
    this.drops.getCompanyOptions().subscribe({
      next: (response) => { 
       this.vendors = response as DropItem[];
       this.vendors = this.vendors.sort((a, b) => a.Description.localeCompare(b.Description));
       this.vendors.unshift({ Value: 0, Description: 'Choose' });
       this.selectedVendor = this.vendors[0]; // sets first vendor as default
   
      },
      error: (error) => console.log(error)
    });
  }

  onSubmit() {
    // ik wil de vendor en bio/mech valves hier ophalen, zodat ik een list van valves kan tonen
    this.proc.getProductsByVTP(this.selectedVendor.Value, this.selectedValveType.Description, 'Aortic').subscribe({
      next: (response) => {
        this.selectedValves = response as TypeOfValve[];
        this.proc.valveList.set(this.selectedValves);
        if (this.proc.valveList().length == null || this.proc.valveList().length == 0) {
          this.toastr.error('No valves found ...', 'Error');
        } else {
          this.router.navigate(['/valveList'])
        }

      },
      error: (error) => console.log(error),
      complete: () => { }
    });
  };
}
