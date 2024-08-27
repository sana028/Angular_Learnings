import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from '../services/logInSerive/log-in.service';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule,AppMaterialModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignUpComponent {

  form = new FormGroup({
    userId:new FormControl(0,Validators.required,),
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators['email'],Validators.required]),
    password: new FormControl('',[Validators.minLength(8),Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  })

  constructor(private router: Router,private signup:LogInService) { }

  navigateToLogin =  ()=>{
    this.router.navigateByUrl('')
  }

  createNewAccount = () =>{  
    if(!this.form.invalid){
    this.signup.signUp(this.form.value).subscribe((res:any)=>{
      alert(res);
      this.router.navigateByUrl('/dashboard');
      })
    }
  }

  get name(){
    return this.form.get('name');
  }
  get userId(){
    return this.form.get('userId');
  }
  get email(){
    return this.form.get('email');
  }
  get password(){
    return this.form.get('password');
  }
}
