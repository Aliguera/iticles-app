import { Article } from 'src/models/article';
import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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
  categories: any = [
                      { category: 'Food', value: 'f' },
                      { category: 'Medicine', value: 'm' },
                      { category: 'Technology', value: 't' },
                      { category: 'Other', value: 'o' }
                    ];

  constructor(private ofAuth: AngularFireAuth,
              private navCtrl: NavController,
              private router: Router,
              private dataService: DataService,
              private articleService: ArticleService) {
              }

  ionViewWillEnter() {
    this.ofAuth.authState.subscribe(data => { console.log("kdoawopd" + data.email)});
    this.articleService.getArticles().valueChanges().subscribe(res => {
      console.log(res);
      this.articles = res;
      this.backupArticles = res;
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

  filter(categoryValue) {
    switch (categoryValue) {
      case 'a':
        this.articles = this.backupArticles;
        break;
      case 'f':
        this.articles.filter(element => {
          element.category = 'Food';
        });
        break;

      case 'm':
        this.articles.filter(element => {
          element.category = 'Medicine';
        });
        break;

      case 't':
        this.articles.filter(element => {
          element.category = 'Technology';
        });
        break;
    
      default:
        this.articles.filter(element => {
          element.category = 'Other';
        });
        break;
    }
  }

}
