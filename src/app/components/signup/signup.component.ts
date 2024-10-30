import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  type: string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  signUpForm! : FormGroup;
    constructor(private fb : FormBuilder,private auth : AuthService , private router:Router){}

    ngOnInit(): void {
      this.signUpForm = this.fb.group({
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordValidator]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        nationalID: ['', Validators.required],
        gender: ['', Validators.required],
        maritalState: ['', Validators.required],
        roleName: ['Employee'],
        phoneNumber: ['', Validators.required],
        phoneNumber2: ['', Validators.required],
        addressCity: ['', Validators.required],
        addressRegion: ['', Validators.required],
        addressStreet: ['', Validators.required],
        branchId: ['', Validators.required],
      });
    }

passwordValidator(control: FormGroup): { [key: string]: boolean } | null {
  const password = control.value;

  if (!password || password.length < 6) {
    return { 'passwordLength': true };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumeric = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

  if (!(hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar)) {
    return { 'passwordStrength': true };
  }

  return null;
}

  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text" : this.type="password";
    }

    onSignup(){
      console.log(this.signUpForm.value)
      if(this.signUpForm.valid){
        this.auth.signUp(this.signUpForm.value)
        .subscribe({
          next:res=>{
            console.log(this.signUpForm.value)
            this.signUpForm.reset();
            this.router.navigate(['start']);

          },
          error:(err)=>{
            console.log("error")
            console.log(err)
          }
        })

      }else{
        this.validateAllFormFields(this.signUpForm);
      }
    }

    private validateAllFormFields(formGroup:FormGroup){
      Object.keys(formGroup.controls).forEach(field=>{
        const control  = formGroup.get(field);
        if(control instanceof FormControl){
          control.markAsDirty({onlySelf:true});
        }else if(control instanceof FormGroup){
          this.validateAllFormFields(control)
        }
      })
    }
}

