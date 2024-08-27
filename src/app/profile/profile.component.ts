import { Component, OnInit } from '@angular/core';
import { UnrelatedService } from '../services/unrelated.service';
import { CommonModule } from '@angular/common';
import { Router,RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/apiService/api.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
    userData:any;
   constructor(private unrelated:UnrelatedService,private router:Router,private activeRoute:ActivatedRoute, private apiService:ApiService){}


   ngOnInit(): void {
      this.userData = this.activeRoute.snapshot.data['resolvedData'];
     }

   editTheProfile=()=>{
     this.router.navigateByUrl(`dashboard/profile/edit-profile/${this.userData.Id}`)
   }

}
