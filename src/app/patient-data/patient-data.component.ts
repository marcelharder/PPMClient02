import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-data',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './patient-data.component.html',
  styleUrl: './patient-data.component.css'
})
export class PatientDataComponent {
constructor(private toastr: ToastrService) {}
onSubmit() {
this.toastr.success('Data submitted successfully!', 'Success');
}
  pd: any = { Age: 1, Gender: "M", Height: 0.0, Weight: 0.0}

}
