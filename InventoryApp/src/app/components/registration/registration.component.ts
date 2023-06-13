import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  myForm!: FormGroup;
  showPassword: boolean = false;
  password!: string;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.reactiveForm();
  }
    toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(10)]],
      lastname: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.minLength(10),Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  saveUser(): void {
    const user: User = {
      id: 0,
      name: this.myForm.get('name')!.value,
      lastname: this.myForm.get('lastname')!.value,
      email: this.myForm.get('email')!.value,
      password: this.myForm.get('password')!.value,
    };
    this.userService.adduser(user).subscribe({
      next: (data) => {
        this.snackBar.open('El Usuario fue registrado con exito!', '', {
          duration: 6000,
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
