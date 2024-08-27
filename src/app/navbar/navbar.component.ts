import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    FontAwesomeModule,
    MatTooltipModule,
    CommonModule,
    NgClass,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isClicked:boolean =false;
  isExpanded: boolean = false;
  selectedRoute:string='';
  routeLinks: any = [
    { path: '/dashboard', label: 'Dashboard',icon:'dashboard' },
    { path: 'profile', label: 'Profile',icon:'account_circle' },
    {path:'tasks',label:'Tasks',icon:'task'},
    {path:'pipes',label:'pipes',icon:'info'},
    {path:'',label:'Log Out' ,icon:'logout'}
  ];

  constructor(private router: Router, library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  hitting = () => {
    this.router.navigateByUrl('dashboard/home');
  };
  
  selectTheList = (route:any) =>{
   this.selectedRoute = route.label;
  }
  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
