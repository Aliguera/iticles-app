import { AuthService } from './../auth.service';
import { ArticleService } from './../article.service';
import { Component } from '@angular/core';
import { Article } from 'src/models/article';
import { DataService } from './../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  favoriteArticlesList = [];
  backupArticles: any = [];
  subjecties: any = [
                      { subject: 'Food', value: 'f' },
                      { subject: 'Medicine', value: 'm' },
                      { subject: 'Technology', value: 't' },
                      { subject: 'Other', value: 'o' }
                    ];
  subjectValue: any = '';

  constructor(private articleService: ArticleService,
              private authService: AuthService,
              private dataService: DataService,
              private router: Router) {}

  async getFavoriteArticlesList() {
    const userID = this.authService.getUser().uid;
    this.articleService.getUserFavoriteArticles(userID).valueChanges().subscribe((res:any) => {
      this.backupArticles = res;
      this.favoriteArticlesList = res;
    });
  }

  ionViewWillEnter() {
   this.getFavoriteArticlesList();
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
    switch (subjectValue) {
      case 'a':
        this.favoriteArticlesList = this.backupArticles;
        break;
      case 'f':
        this.favoriteArticlesList = this.backupArticles.filter(element => {
          return element.subject == 'food';
        });
        break;

      case 'm':
        this.favoriteArticlesList = this.backupArticles.filter(element => {
          return element.subject == 'medicine';
        });
        break;

      case 't':
        this.favoriteArticlesList = this.backupArticles.filter(element => {
          return element.subject == 'technology';
        });
        break;

      default:
        this.favoriteArticlesList = this.backupArticles.filter(element => {
          return element.subject == 'other';
        });
        break;
    }
  }

}
