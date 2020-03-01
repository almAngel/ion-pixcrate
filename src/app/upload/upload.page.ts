import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { IonInput, LoadingController, ToastController, Events } from '@ionic/angular';
import { ImageService } from '../services/image.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  @ViewChild(IonInput, { static: false }) fileInput: IonInput;
  @Output("onUpload") onUpload = new EventEmitter<any>();
  
  file: File;
  
  constructor(
    private imageService: ImageService,
    private storage: Storage,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private jwtService: JwtHelperService,
    public events: Events,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
  }

  async loadFile(event) {
    let message: string;
    
    if (event.target.files[0] != undefined) {
      let loading = await this.loadingController.create({
        message: "Uploading",
        translucent: true,
        spinner: "lines"
      });
      await loading.present();
      let res: any = await this.imageService.uploadImage(
        event.target.files[0],
        await this.storage.get("access_token"),
        async () => {
          loading.dismiss();
        }
      );

      if(res.status == 201) {
        message = res.msg;
        this.events.publish('image:uploaded');
      } else if(res.status == 415){
        message = res.msg;
      } else {
        message = res.msg;
      }

      let toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      await toast.present();
    }

  }

  async openCamera() {
    await this.cameraService.snap();
  }


}
