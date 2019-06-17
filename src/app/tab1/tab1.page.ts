import { Article } from 'src/models/article';
import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavigationExtras } from '@angular/router/src/router';
import { ArticleService } from 'src/app/article.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  articles: any = [];
  backupArticles: any = [];
  subjecties: any = [
                      { subject: 'Food', value: 'f' },
                      { subject: 'Medicine', value: 'm' },
                      { subject: 'Technology', value: 't' },
                      { subject: 'Other', value: 'o' }
                    ];
  subjectValue: any = '';

  constructor(private ofAuth: AngularFireAuth,
              private navCtrl: NavController,
              private router: Router,
              private dataService: DataService,
              private articleService: ArticleService,
              private loadingCtrl: LoadingController) {
              }

  async ionViewWillEnter() {
    const loadingElement = await this.loadingCtrl.create({
      message: 'Loading articles...',
      spinner: 'crescent',
      duration: 2000
    });
    loadingElement.present();
    this.articleService.getArticles().valueChanges().subscribe(res => {
      console.log(res);
      this.articles = res;
      this.backupArticles = res;
      loadingElement.dismiss();
    });
  }

  wrapString(body: string) {
    if (body.length > 30) {
      return body.substring(0, 60) + '...';
    } else {
      return body;
    }
  }

  openDetails(article) {
    this.dataService.setData(article.id, article);
    console.log(article);
    this.router.navigateByUrl('/article-details/' + article.id);
  }

  filter(subjectValue) {
    console.log(this.articles);
    switch (subjectValue) {
      case 'a':
        this.articles = this.backupArticles;
        break;
      case 'f':
        this.articles = this.backupArticles.filter(element => {
          return element.subject == 'food';
        });
        break;

      case 'm':
        this.articles = this.backupArticles.filter(element => {
          return element.subject == 'medicine';
        });
        break;

      case 't':
        this.articles = this.backupArticles.filter(element => {
          return element.subject == 'technology';
        });
        break;

      default:
        this.articles = this.backupArticles.filter(element => {
          return element.subject == 'other';
        });
        break;
    }
  }

}
