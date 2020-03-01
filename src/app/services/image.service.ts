import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  images: [];

  constructor(private httpClient: HttpClient) { }

  private urls: any = {
    ROOT: "https://p11410199117114115105118101.herokuapp.com/",
    GET_IMAGES: "image/all",
  };

  lastData: any;

  async init(token: string) {
    this.images = await this.getImages(token);
  }

  getImages(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.urls.ROOT + this.urls.GET_IMAGES, {
        responseType: "json",
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*",
          "px-token": token
        })
      })
        .subscribe((data: []) => {
          resolve(
            // PARA VERLO AL REVÉS, COMO PASA CON INSTAGRAM (EN STACK)
            this.reverseArray(data)
          );
        });
    });
  }

  uploadImage(image: File, token: string, callback: Function) {
    let formData: FormData = new FormData();
    formData.append("image", image);
    formData.append("description", " ");
    formData.append("visibility", "public");
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.urls.ROOT + `image/new`, formData, {
        responseType: "json",
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*",
          "px-token": token
        })
      }).subscribe((data) => {
        resolve(data);
        callback();
      });
    });
  }

  editImage(id: string, token: string, body: {}) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(this.urls.ROOT + `image/${id}`, body, {
        responseType: "json",
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*",
          "px-token": token
        })
      }).subscribe((data) => {
        resolve(data);
      });
    });
  }

  deleteImage(id: string, token: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.urls.ROOT + `image/${id}`, {
        responseType: "json",
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*",
          "px-token": token
        })
      }).subscribe((data) => {
        resolve(data);
      });
    });
  }

  setLastData(data: any) {
    this.lastData = data;
  }

  getLastData() {
    return this.lastData;
  }

  clearImages() {
    this.images = [];
  }

  reverseArray(arr) {
    var newArray = [];
    for (var i = arr.length - 1; i >= 0; i--) {
      newArray.push(arr[i]);
    }
    return newArray;
  }

}
