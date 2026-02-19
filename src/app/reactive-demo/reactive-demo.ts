import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-demo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-demo.html',
  styleUrl: './reactive-demo.css'
})
export class ReactiveDemo {
  roles = ['Admin', 'User', 'Guest'];
  statuses = ['Permanent', 'Probationary'];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // 4-12 chars, alphanumeric + underscore
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{4,12}$/)]],

      // Email: standard email validation
      email: ['', [Validators.required, Validators.email]],

      // 8+ chars, 1 upper, 1 lower, 1 number
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],

      // 4. Role: Required
      role: ['', Validators.required],

      // 5Gender: Required
      gender: ['', Validators.required],

      // 6. Status: Required
      status: ['', Validators.required],

      // 7. Comments: Optional
      comments: ['']
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      console.log('Form Submitted!', this.form.value);
      alert('Form Submitted Successfully! Check Console for values.');
    }
  }

  isInvalid(name: string) {
    const control = this.form.get(name);
    return control && control.touched && control.invalid;
  }
}
