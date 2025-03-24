import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../services/apiService/api.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { canComponentActivate } from '../services/canDecativate/unSavedChanges';
import { Observable } from 'rxjs';
import { ToasterService } from '../services/toaster/toaster.service';
import { log } from 'console';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent
  implements OnInit, AfterViewInit, canComponentActivate
{
  id: number = 0;
  skills: any;
  designations: any;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    designation: new FormControl('', Validators.required),
    skill: new FormControl([], Validators.required),
    about: new FormControl(''),
  });
  photoUrl: any;
  photoType: string = '';

  selectedFile: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private fb: FormBuilder,
    private toastr: ToasterService
  ) {
    this.selectedFile = this.fb.group({
      file: [null],
    });
  }

  ngOnInit(): void {
    const response = this.activeRoute.snapshot.data['resolvedData'];
    console.log(response);
    this.form.patchValue({
      name: response.Name,
      email: response.Email,
      designation: response?.Designation,
      skill: JSON.parse(response?.Skills),
      about: response?.About,
    });
   console.log()
    console.log(this.photoUrl)
    this.photoType = response.photoType;
    const blobData = new Uint8Array(response.photo.data);
    const blob = new Blob([blobData], { type: this.photoType });
    const file = new File([blob], blob.type, { type: this.photoType });
    console.log(this.convertBufferToBase64(response.photo.data));
    this.photoUrl  = URL.createObjectURL(file);
    this.selectedFile = file;
    this.id = response.Id;
  }

  ngAfterViewInit(): void {
    this.api.getSkills().subscribe((response: any) => {
      this.skills = response.data;
    });
    this.api.getDesignations().subscribe((response: any) => {
      this.designations = response.data;
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.form.valid) {
      return true;
    } else {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
  }

  convertBufferToBase64(buffer: any): string {
    const binary = buffer.reduce(
      (acc: string, byte: number) => acc + String.fromCharCode(byte),
      ''
    );
    
    return binary;
  }

  onSubmit = () => {
    if (this.form.valid) {
      const formData = new FormData();
      console.log(this.selectedFile);
      formData.append('file', this.selectedFile);
      formData.append('name', this.form.get(['name'])?.value);
      formData.append('email', this.form.get(['email'])?.value);
      formData.append('designation', this.form.get(['designation'])?.value);
      formData.append('skill', JSON.stringify(this.form.get(['skill'])?.value));
      formData.append('about', this.form.get(['about'])?.value);
      formData.append('id', this.id.toString());
      this.api.updateProfile(formData).subscribe(
        (response) => {
          this.toastr.displaySuccessMessage('Updated Data Successfully', 5000);
          this.closeTheDialog();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('invalid form');
    }
  };

  onFileChange = (event: any) => {
    const input = <File>event.target.files[0];
    console.log(input);
    this.photoUrl = URL.createObjectURL(input);
    this.selectedFile = input;
  };

  closeTheDialog = () => {
    this.router.navigateByUrl('dashboard/profile');
  };
}
