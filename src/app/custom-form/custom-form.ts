import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './custom-form.html',
  styleUrl: './custom-form.css'
})
export class CustomForm {
  form!: FormGroup;

  departments = ['Sales', 'Support', 'IT', 'HR'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      rating: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      console.log('Feedback Submitted:', this.form.value);
      alert('Thank you for your feedback!');
      this.form.reset();
    }
  }

  // Helper for error checking
  isInvalid(name: string) {
    const control = this.form.get(name);
    return control && control.touched && control.invalid;
  }
}
