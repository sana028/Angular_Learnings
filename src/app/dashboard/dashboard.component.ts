import { Component } from '@angular/core';
import { Router,NavigationStart, RoutesRecognized, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, NavigationCancel, NavigationError, ChildActivationStart, ChildActivationEnd } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  constructor(private router:Router){
    router.events.subscribe((event)=>{
      if (event instanceof NavigationStart) {
        console.log('Navigation Started');
      } else if (event instanceof RoutesRecognized) {
        console.log('RoutesRecognized event:', event);
      } else if (event instanceof RouteConfigLoadStart) {
        console.log('RouteConfigLoadStart event:', event);
      } else if (event instanceof RouteConfigLoadEnd) {
        console.log('RouteConfigLoadEnd event:', event);
      } else if (event instanceof NavigationEnd) {
        console.log('Navigation End');
      } else if (event instanceof NavigationCancel) {
        console.log('Navigation working');
        console.log('Navigation cancelled');
      } else if (event instanceof NavigationError) {
        console.log('Navigation working');
        console.log('Navigation error');
      } else if (event instanceof ChildActivationStart) {
       
        console.log(`ChildActivationStart event for the lift`);
        // Load data specific to the child component here
      } else if (event instanceof ChildActivationEnd) {
        console.log('ChildActivationEnd event:', event);
        // Perform any necessary cleanup tasks here
      }
    })
  }
  
}
