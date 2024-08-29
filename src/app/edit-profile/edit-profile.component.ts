import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../services/apiService/api.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { canComponentActivate } from '../services/canDecativate/unSavedChanges';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatFormFieldModule,MatSelectModule,MatInputModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit, AfterViewInit, canComponentActivate {
  id: number = 0;
  skills: any;
  designations:any;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    designation: new FormControl('', Validators.required),
    skill: new FormControl([], Validators.required),
    photo: new FormControl(''),
    about: new FormControl(''),
  });
  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private api:ApiService
  ) {}

  ngOnInit(): void {
     const response = this.activeRoute.snapshot.data['resolvedData'];
     console.log(response);
     this.form.patchValue({
      name: response.Name,
      email: response.Email,
      designation: response?.Designation,
      skill:response?.Skills,
      about:response?.About
    });
    this.id = response.Id;
  }

  ngAfterViewInit(): void {
    this.api.getSkills().subscribe((response:any)=>{
         this.skills=response.data;
    })
    this.api.getDesignations().subscribe((response:any)=>{
      this.designations=response.data;
    })
  }
   
  canDeactivate():Observable<boolean> | Promise<boolean> | boolean{
    if(this.form.valid){
      return true;
    }else{
      return confirm('You have unsaved changes. Do you really want to leave?')
    }
 }

  onSubmit = () => {
    if(this.form.valid){
    this.api.updateProfile(this.form,this.id).subscribe((response)=>{
      this.closeTheDialog();
    },
    (error)=>{
      console.log(error);
    })
  }
  else{
    console.log('invalid form');
  }
  };

  closeTheDialog = () => {
    this.router.navigateByUrl('dashboard/profile');
  };
}
