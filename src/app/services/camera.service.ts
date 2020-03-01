import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, Capacitor } from '@capacitor/core';

const { Camera, Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  imageOptions = {
    quality: 100,
    allowEditing: false,
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera
  };

  constructor() { }

  async snap() {
    const originalPhoto = await Camera.getPhoto(this.imageOptions);
    const photoInTempStorage = await Filesystem.readFile({ path: originalPhoto.path });

    const miliseconds = (new Date()).getTime();
    const fileName = miliseconds + ".jpg";

    await Filesystem.writeFile({
      data: photoInTempStorage.data,
      path: fileName,
      directory: FilesystemDirectory.Data
    });

    const finalPhotoUri = await Filesystem.getUri({
      directory: FilesystemDirectory.Data,
      path: fileName
    });

    const photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri);

    return photoPath;
  }

}
