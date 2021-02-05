import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  userForm: FormGroup;
  user = this.api.getCurrentUser();

  constructor(
    private api: ApiService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    console.log('username : ', this.userForm.value.username);
    console.log('password : ', this.userForm.value.password);
    this.api.signIn(this.userForm.value.username, this.userForm.value.password).subscribe(
      res => {
        console.log('login success', res);
      }, async err => {
        const alert = await this.alertCtrl.create(
          {
            header: 'Error',
            subHeader: err.error.data.status,
            message: err.error.message,
            buttons: ['Ok']
          });
        await alert.present();
      }
    )
  }

  logout() {
    this.api.logout();
  }

}