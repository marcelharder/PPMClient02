import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pd } from '../_models/pd';
import { PatientDataService } from '../_services/patientData.service';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';


@Component({
  selector: 'app-patient-data',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './patient-data.component.html',
  styleUrl: './patient-data.component.css'
})
export class PatientDataComponent {
constructor(private toastr: ToastrService) {}
patientDataService = inject(PatientDataService);
productService = inject(ProductService);
router = inject(Router);
Patient: Pd = { Age: 1, Gender: "M", Height: 0.0, Weight: 0.0, EOA: 0.0 };

onSubmit() {
this.patientDataService.uploadPatient(this.Patient).subscribe(
  data => {
    //set the result to requiredEOA in the product service
    this.productService.requiredEOA.set(data.EOA);
    this.toastr.success('Data submitted successfully!', 'Success');
    this.router.navigate(['/valve-data']);

  },
  error => {
    console.error('Error:', error);
    this.toastr.error('Failed to submit data.', 'Error');
    this.router.navigate(['/valve-data']);
  }
  

)

};
}

