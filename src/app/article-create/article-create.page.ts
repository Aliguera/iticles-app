import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { FIREBASE_CONFIG } from './../app.firebase.config';
import { Component, OnInit } from '@angular/core';
import { storage, initializeApp } from 'firebase';
import { TemplateParseResult } from '@angular/compiler';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.page.html',
  styleUrls: ['./article-create.page.scss'],
})
export class ArticleCreatePage implements OnInit {

  constructor(private camera: Camera) {
    initializeApp(FIREBASE_CONFIG);
   }

  ngOnInit() {
  }

  async takePicture() {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      const result = await this.camera.getPicture(options);

      const image = `data:image/jpeg;base64,${result}`;

      const pictures = storage().ref('pictures');
      pictures.putString(image, 'data_url');
    } catch (e) {
      console.log(e);
    }
  }

}
