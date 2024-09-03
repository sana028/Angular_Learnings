import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UnrelatedService } from './services/unrelated.service';
import { LogInService } from './services/logInSerive/log-in.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { ApiService } from './services/apiService/api.service';
import { FilterPipe } from './services/pipe/filter.pipe';
import { IfdirectiveDirective } from './directives/StructuralDirectives/ifdirective.directive';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    UnrelatedService,
    LogInService,
    AuthGuard,
    AuthService,
    ApiService,
    FilterPipe,
    IfdirectiveDirective,
  ],
})
export class AppComponent{
  title = 'first';
}
