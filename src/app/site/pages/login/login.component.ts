import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AppService } from "../../../shared/services/app/app.service";
import { PageType } from "../../../shared/enums/page-type";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { SharedModules } from "../../../shared/shared.module";

@Component({
  selector: "bj-login",
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SharedModules,
    FormsModule,
  ]
})
export class LoginComponent implements OnInit
{
  loginForm: FormGroup = this._fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _appService: AppService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._appService.setCurrentPage(PageType.Login);
  }

  onLogInClick(): void {
    if (! this.loginForm.valid) {
      return;
    }

    const email: string = this.loginForm.get("email")?.value;
    const password: string = this.loginForm.get("password")?.value;
    const redirectKey: string | null = this._route.snapshot.queryParamMap.get('redirect_key')

    this._authService.logIn(email, password, redirectKey);
  }
}
