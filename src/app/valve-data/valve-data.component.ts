import { NgFor } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { DropItem } from '../_models/dropItem';
import { dropDownService } from '../_services/dropDown.service';
import { ProductService } from '../_services/product.service';
import { TypeOfValve } from '../_models/TypeOfValve';

@Component({
  selector: 'app-valve-data',
  standalone: true,
  imports: [FormsModule,BsDropdownModule, NgFor],
  templateUrl: './valve-data.component.html',
  styleUrl: './valve-data.component.css'
})
export class ValveDataComponent implements OnInit {
router = inject(Router);
drops = inject(dropDownService);
proc = inject(ProductService);
selectedValveType: DropItem = {value: 0, description: 'Choose'};
selectedVendor: DropItem = {value: 0, description: 'Choose'}; 
vendors: DropItem[] = []
selectedValves: TypeOfValve[] = [] 

ValveTypes = [
  { value: 0, description: 'Choose' },
  { value: 1, description: 'Mechanical' },
  { value: 2, description: 'Biological' }];

ngOnInit(): void {
  this.loadDrops();
}

loadDrops(){
  this.drops.getCompanyOptions().subscribe({
    next: (response) => this.vendors = response as DropItem[],
    error: (error) => console.log(error)
  });
  this.vendors = this.vendors.sort((a, b) => a.description.localeCompare(b.description));
  this.vendors.unshift({value: 0, description: 'Choose'});
}

onSubmit() {
// ik wil de vendor en bio/mech valves hier ophalen, zodat ik een list van valves kan tonen
  this.proc.getProductsByVTP(this.selectedValveType.value,this.selectedVendor.value.toString(),'Aortic').subscribe({
    next: (response) => this.selectedValves = response as TypeOfValve[],
    error: (error) => console.log(error),
    complete: () => this.router.navigate(['/valveList'])
  });
const valveList = signal(this.selectedValves);
console.log(valveList());
};
}
