import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  name:string='';
  email:string='';
  password:string='';

  constructor(private router: Router) { }

  navigateToLogin =  ()=>{
    this.router.navigateByUrl('')
  }
}
