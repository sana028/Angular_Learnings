import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { LogInService } from '../services/logInSerive/log-in.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { UnrelatedService } from '../services/unrelated.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ToasterComponent, CommonModule, LoaderComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent{
  email: string = '';
  password: string = '';
  statusType: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private loginService: LogInService,
    private unrelatedData:UnrelatedService,
    private cdr:ChangeDetectorRef
  ) {}

  handleSignUp = () => {
    this.router.navigateByUrl('signUp');
  };

  logIn = () => {
    if (this.email && this.password) {
      this.isLoading = true;
      this.cdr.detectChanges();
      const data = {
        email: this.email,
        password: this.password,
      };
      this.loginService.signIn(data).subscribe(
        (response: any) => {
          if (response) {
            this.isLoading = false;
              sessionStorage.setItem('access_token', response.auth.token);
              sessionStorage.setItem('expiresIn', response.auth.decodedToken);
              sessionStorage.setItem('userId',response.auth.id);
              sessionStorage.setItem('role',response.auth.role);
              this.router.navigateByUrl('dashboard');
          }
        },
        (error: any) => {
          this.router.navigateByUrl('access-denied');
          console.error(error);
        }
      );
    }
  };


}
