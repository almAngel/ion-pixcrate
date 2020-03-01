import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private storage: Storage,
    private router: Router,
    private imageService: ImageService
  ) { }

  ngOnInit() {
  }

  async logOut() {
    let alert = await this.alertController.create({
      header: "Log out",
      message: "Are you sure you want to log out?",
      buttons: [
        {
          text: "No",
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: "Yes",
          handler: async () => {
            let res: any = await this.authService.logOut(
              await this.storage.get("access_token")
            );

            if (res.status == 200) {
              await this.storage.set("access_token", "");
              await this.router.navigate(['/login'], { state: { msg: res.msg, code: 1432 } });
              this.imageService.clearImages();
            }
            // ONLY FOR DEBUG
            await this.storage.set("access_token", "");
            await alert.dismiss();
          }
        }
      ]
    });
    alert.present();

  }
}
