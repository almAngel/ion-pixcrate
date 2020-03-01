import { Component, OnInit, Input, ViewChild, AfterContentInit, AfterViewChecked, ElementRef, Output, EventEmitter } from '@angular/core';
import { PopoverController, IonTextarea, ToastController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { ImageService } from 'src/app/services/image.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {
  
  @Input("id") id: string;
  @Input("src") src: string;
  @Input("description") description: string;
  @ViewChild(IonTextarea, {static: false}) descriptionTextArea: IonTextarea;
  @Output("onDelete") onDelete = new EventEmitter<any>();

  constructor(
    private popover: PopoverController,
    private imageService: ImageService,
    private storage: Storage,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  async onClickMoreButton(event) {
    let menu = await this.popover.create({
      component: PopoverComponent,
      event: event,
      translucent: true,
      componentProps: {
        header: "Options",
        options: [
          {
            name: "Edit",
            callback: async () => {
              // ENABLE
              this.descriptionTextArea.disabled = false;
              // FOCUS TEXTAREA
              this.descriptionTextArea.setFocus();
              // GET NATIVE
              let e = await this.descriptionTextArea.getInputElement() as HTMLTextAreaElement;
              // CURSOR TO END OF THE TEXT AREA
              e.setSelectionRange(e.value.length, e.value.length);
              
              menu.dismiss();
            }
          },
          {
            name: "Delete",
            callback: async () => {
              let e: any = await this.imageService.deleteImage(
                this.id,
                await this.storage.get("access_token")
              );
              if(e.status == 200) {
                this.onDelete.emit(this.id);
              }
              menu.dismiss();
            }
          }
        ],
        dismiss: () => {
          menu.dismiss()
        }
      }
    });
    return await menu.present();
  }


  async confirm(keyCode) {

    if(keyCode == 13) {
      let res: any = await this.imageService.editImage(
        this.id,
        await this.storage.get("access_token"),
        {
          description: this.descriptionTextArea.value.trim(),
          visibility: "public"
        }
      );
      
      // TRIM LINE JUMPS AND SPACES FROM START AND END
      this.descriptionTextArea.value = this.descriptionTextArea.value.trim();

      this.descriptionTextArea.disabled = true;

      if(res.status == 200) {
        let toast = await this.toastController.create({
          message: "Image edited successfully",
          duration: 2000,
          position: "bottom"
        });
        toast.present();
      }
      
    }
   
  }
}
