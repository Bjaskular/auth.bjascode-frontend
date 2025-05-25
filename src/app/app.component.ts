import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './shared/services/app/app.service';
import { AuthService } from './shared/services/auth/auth.service';
import { SharedModules } from './shared/shared.module';
import { LoadingComponent } from './components/loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    SharedModules,
    LoadingComponent
  ],
})

export class AppComponent {
  isAppLoading$: Observable<boolean> = this._appService.isAppLoading$;

  constructor(
    private _appService: AppService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._authService.init();
  }
}
