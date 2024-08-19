import { Component } from '@angular/core';
import { FormsModule ,FormGroup,FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email:string='';
  password:string='';

  constructor(private router: Router) { }
  handleSignUp =()=>{
    this.router.navigateByUrl('signUp');
  }
}
