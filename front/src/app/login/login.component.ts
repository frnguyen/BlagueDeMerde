import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticateService} from '../shared/authenticate/authenticate.service';
import {AuthenticateDTO} from '../shared/model/interface/authenticate-dto';
import {UserService} from '../shared/user/user.service';
import {ToastrService} from 'ngx-toastr';
import {UserEntity} from '../shared/model/entity/user-entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private authenticateService: AuthenticateService,
              private userService: UserService,
              private toastService: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    const authenticateDTO: AuthenticateDTO = {login: this.loginForm.get('login').value, password: this.loginForm.get('password').value};
    this.authenticateService.authenticate(authenticateDTO).subscribe(
        (user: UserEntity) => {
          this.userService.setCurrentUser(user);
          this.router.navigateByUrl('/');
        },
        () => {
          this.toastService.error('Identifiant/mot de passe incorrect', 'Connexion');
        }
    );
  }

}
