import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeOfValve } from '../_models/TypeOfValve';
import { ProductService } from '../_services/product.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-valve-list',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './valve-list.component.html',
  styleUrl: './valve-list.component.css'
})
export class ValveListComponent implements OnInit {
  constructor(private toastr: ToastrService) { }
  selectedValve: TypeOfValve = {} as TypeOfValve;
  valvel = signal<TypeOfValve[]>([]);
  proc = inject(ProductService);
  router = inject(Router);

  ngOnInit(): void {

    this.valvel = this.proc.valveList;
    console.log(this.valvel());
  }

  onSubmit() { }

  Cancel() { this.router.navigate(['/valve-data']) }

  getDetails(v: TypeOfValve) {
    debugger;
    this.router.navigate(['/valve-sizes']);
    this.proc.selectedValveTypeId.set(v.ValveTypeId);
  }

}


