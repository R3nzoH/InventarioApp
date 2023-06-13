import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
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
      email: ['', [Validators.required, Validators.minLength(10),Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }






}
