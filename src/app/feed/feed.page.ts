import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PopoverComponent } from '../components/popover/popover.component';
import { Storage } from '@ionic/storage';
import { NavParams, Events, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  entryComponents: [PopoverComponent]
})
export class FeedPage implements OnInit {

  constructor(
    private imageService: ImageService,
    private router: Router,
    private storage: Storage,
    private jwtService: JwtHelperService,
    public events: Events,
    private customAlert: AlertController,
    private customToast: ToastController
  ) { }

  async ngOnInit() {

    await this.imageService.init(
      await this.storage.get("access_token")
    );

    // GET UPLOAD INFO WHEN EXISTS
    this.events.subscribe('image:uploaded', async () => {
      await this.loadImagesOnStart();
    });
  }

  async loadImagesOnStart() {
    await this.imageService.init(
      await this.storage.get("access_token")
    );
  }

  async loadImagesOnRefresh(event) {
    await this.imageService.init(
      await this.storage.get("access_token")
    );
    event.target.complete();
  }

  async onDeleteImpl(id) {

    let alert = await this.customAlert.create({
      message: "Are you sure you want to delete this picture?",
      buttons: [
        {
          text: "Yes",
          handler: async () => {
            let i = this.imageService.images.findIndex((img: any) => {
              return img._id == id;
            });
            delete this.imageService.images[i];

            // ELIMINAR LOS HUECOS DE DENTRO DEL ARRAY
            this.imageService.images = this.imageService.images.filter((el) => {
              return el != null;
            }) as [];

            let toast = await this.customToast.create({
              message: "Image deleted successfuly",
              duration: 2000,
              position: "bottom"
            });
            toast.present();
          }
        },
        {
          text: "No",
          handler: () => {
            this.customAlert.dismiss();
          }
        },
      ]
    });
    alert.present();
  }

  onUploadImpl() {

    /*
    if(lastUploadCode == 201) {
      this.images = await this.imageService.getImages(
        await this.storage.get("access_token")
      );
    }
    */
  }
}
