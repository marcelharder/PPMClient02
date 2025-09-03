import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-valve-data',
  standalone: true,
  imports: [FormsModule,BsDropdownModule, NgFor],
  templateUrl: './valve-data.component.html',
  styleUrl: './valve-data.component.css'
})
export class ValveDataComponent implements OnInit {
options = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' }
];
ValveTypes = ["Mechanical","Biological"];
selectedOption: any = {id:1, name:'Option 1'};
selectedTypeOption: any;



ngOnInit(): void {
  // Initialization logic here if needed
  this.selectedOption = this.options[0];
}

onSubmit(_t5: NgForm) {
throw new Error('Method not implemented.');
}

}
