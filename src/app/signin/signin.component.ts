import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { Store } from '@ngrx/store';
import { getLoader, getLoginFailure } from './state/signin.selector';
import { Observable, Subscription } from 'rxjs';
import { login } from './state/signin.action';
import { ToasterService } from '../services/toaster/toaster.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  isLoading: Observable<boolean>;
  loginFailure$: Observable<boolean>;
  loginFailureSubscription: Subscription;
  loginFailure: boolean = false;

  constructor(
    private router: Router,
    private store: Store,
    private toastr: ToasterService
  ) {
    this.isLoading = this.store.select(getLoader);
    this.loginFailure$ = this.store.select(getLoginFailure);
    this.loginFailureSubscription = this.loginFailure$.subscribe(
      (res: boolean) => {
        this.loginFailure = res;
        if (this.loginFailure) {
          this.toastr.displayErrorMesssage('Invalid Credentials', 5000);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.loginFailureSubscription.unsubscribe();
  }

  handleSignUp = () => {
    this.router.navigateByUrl('signUp');
  };

  logIn = () => {
    if (this.email && this.password) {
      this.store.dispatch(
        login({ email: this.email, password: this.password })
      );
    }
  };
}
