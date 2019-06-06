import { AuthService } from './../auth.service';
import { SharedService } from './../shared.service';
import { ArticleService } from './../article.service';
import { Article } from './../../models/article';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { FIREBASE_CONFIG } from './../app.firebase.config';
import { Component, OnInit } from '@angular/core';
import { storage, initializeApp } from 'firebase';
import { TemplateParseResult } from '@angular/compiler';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.page.html',
  styleUrls: ['./article-create.page.scss'],
})
export class ArticleCreatePage implements OnInit {
  picturePath = '';
  article: Article = {
    title: '',
    body: '',
    picture_path: '',
    subject: ''
  };
  constructor(private camera: Camera,
              public actionSheetController: ActionSheetController,
              public platform: Platform,
              public articleService: ArticleService,
              public sharedService: SharedService,
              public auth: AuthService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
   }

  ngOnInit() {
  }

  takePicture(imgSourceType: PictureSourceType) {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: imgSourceType
      };
      this.camera.getPicture(options).then(result => {
        this.picturePath = result;
      });

    } catch (e) {
      console.log(e);
    }
  }

  async photoActionSheet() {
    const photoActionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await photoActionSheet.present();
  }

  async createArticle() {
    const nowDate = new Date();
    const nowUnix = nowDate.getTime();
    this.article.userId = this.auth.getUser().uid;
    this.article.picture_path = nowUnix.toString();
    const loading = await this.loadingCtrl.create({});
    loading.present().then(async () => {
      if (this.picturePath !== '') {
        const image = `data:image/jpeg;base64,${this.picturePath}`;

        console.log('Picture path: ', this.picturePath);
        const pictures = storage().ref(nowUnix.toString());
        await pictures.putString(image, 'data_url');
        await pictures.getDownloadURL().then((url) => {
          this.article.picture_path  = url;
        });
      }
      await this.articleService.addArticle(this.article);
      this.loadingCtrl.dismiss();
    });
  }

}
