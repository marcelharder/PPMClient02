import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeOfValve } from '../_models/TypeOfValve';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-valve-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './valve-list.component.html',
  styleUrl: './valve-list.component.css'
})
export class ValveListComponent implements OnInit   {
  vl = signal<TypeOfValve[]>([]);
  proc = inject(ProductService);
  
  ngOnInit(): void {
  
    this.vl = this.proc.valveList;
    console.log(this.vl());
  }
  
  onSubmit() {}

}


