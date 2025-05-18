import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserHttpService } from './shared/services/user.http.service';
import { AuthData } from './shared/models/auth-data.model';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent {
  //input
  //view child
  //private props
  //obervable - own
  //readonly
  //public
  //getters

  email: string = "";
  password: string = "";

  constructor(private _userHttpService: UserHttpService) {}

  getEmail(event: Event): void {
    this.email = (event.target as HTMLInputElement).value;
  }

  getPassword(event: Event): void {
    this.password = (event.target as HTMLInputElement).value;
  }

  getUserData(): void {
    this._userHttpService.getUserData(this.email, this.password)
      .subscribe({
        next: (data: AuthData) => {
          console.log(data);
        },
        error: (response: HttpErrorResponse) => {
          console.error(response);
        }
      });
  }
}
