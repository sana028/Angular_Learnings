import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { HightlighttextDirective } from './directives/high-light-text/hightlighttext.directive';
import { UnrelatedService } from './services/unrelated.service';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    UserInfoComponent,
    HightlighttextDirective,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UnrelatedService],
})
export class AppComponent implements OnInit {
  title = 'first';

  constructor(private unrelated: UnrelatedService) {}

  ngOnInit(): void {
    const icons = [
      {
        icon1: 'basket-shopping',
        icon2: 'circle-plus',
        iconColor: 'blue',
        color: '#0000ff6e',
        orders:70
      },
      {
        icon1: 'bag-shopping',
        icon2: 'circle-check',
        iconColor: 'green',
        color: '#00800033',
        orders:78
      },
      {
        icon1: 'bag-shopping',
        icon2: 'circle-xmark',
        iconColor: 'red',
        color: '#ff000040',
        orders:80
      },
    ];
    this.unrelated.setIconsNames(icons);
  }
}
