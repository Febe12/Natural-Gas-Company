import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {UserserviceService  } from '../../services/userservice.service';
import {Form} from '../../models/form';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrl: './addnewuser.component.css'
})
export class  AddnewuserComponent{
  
  form: FormGroup;
  errorMessage: string | null = null;
  constructor(private userService: UserserviceService,private formbuilder:FormBuilder) {
    this.form = this.formbuilder.group({
      userName:['', [Validators.required]],
      email: ['', [Validators.required , Validators.email]],
      password: ['', [Validators.required , Validators.minLength(6)]],
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      nationalID: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      maritalState: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      phoneNumber2: ['', [Validators.required]],
      addressCity: ['', [Validators.required]],
      addressRegion: ['', [Validators.required]],
      addressStreet: ['', [Validators.required]],
      flameSensor: ['', [Validators.required]],
      gasSensor: ['', [Validators.required]],
      roleName: ['User'],
      branchId: ['', [Validators.required]],
    })

   }
  ngOnInit(): void {

  }


  onsign() {
    if (this.form.valid) {
      let userModel: Form = this.form.value as Form;
      this.userService.addUser(userModel).subscribe({
        next: (response) => {
          console.log(response.message);
          this.form.reset();
          //alert('User added successfully');
        },
        error: (error) => {
          console.error('Error adding user:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
    
  }

    onSubmit() {
      if (this.form.valid) {
        this.userService.registerUser(this.form.value).subscribe({
          next: () => {
            // Handle successful registration
            alert('Registration successful');
          },
          error: (error) => {
            // Handle error response
            this.errorMessage = error;
          }
        });
      }
    }

  }
