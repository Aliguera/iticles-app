import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ArticleService } from '../article.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {
  article: any = {};
  articleFavorited: boolean;
  userFavoriteArticlesObs: any;
  checkArticleObs: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private articleService: ArticleService,
              private firestore: AngularFirestore,
              private loadingCtrl: LoadingController) { }

  async ionViewWillEnter() {
    if (this.route.snapshot.data['article']) {
      this.article = this.route.snapshot.data['article'];
    }

    const loading = await this.loadingCtrl.create({});
    loading.present().then(() => {
      this.checkArticleObs = this.articleService.checkArticleFavorite(this.article.id).valueChanges().subscribe(res => {
        if (res.length > 0) {
          console.log(res);
          this.articleFavorited = true;
        }
        loading.dismiss();
      });
    });
  }

  ionViewWillLeave(){
    this.userFavoriteArticlesObs.unsubscribe();
    this.checkArticleObs.unsubscribe();
  }

  ngOnInit() {
  }

  async favorite() {
    const favoriteID = this.firestore.createId();
    const userID = this.auth.getUser().uid;
    const articleFavorite = {
      favoriteID: favoriteID,
      userID: userID,
      id: this.article.id,
      title: this.article.title,
      body: this.article.body,
      created_at: this.article.created_at,
      picture_path: this.article.picture_path,
      subject: this.article.subject
    };
    console.log("Article favorite: ", articleFavorite);
    const loading = await this.loadingCtrl.create({});
    loading.present().then(async () => {
      this.articleService.favoriteArticle(articleFavorite, favoriteID).then(async res => {
        loading.dismiss();
      });
    });
  }

  async unfavorite() {
    if (this.article.favoriteID) {
      const loading = await this.loadingCtrl.create({});
      loading.present().then(async () => {
        console.log("Favorite ID: ", this.article.favoriteID);
        await this.articleService.checkArticleUnfavorite(this.article.favoriteID);
        this.articleFavorited = false;
        loading.dismiss();
      });
    } else {
      const loading = await this.loadingCtrl.create({});
      loading.present().then(async () => {
        const userID = this.auth.getUser().uid;
        this.userFavoriteArticlesObs = this.articleService.getUserFavoriteArticles(userID).valueChanges().subscribe(async res => {
          const favoriteArticles = res;
          res.forEach(element => {
            if (element.id == this.article.id) {
              this.article = element;
            }
          });
          await this.articleService.checkArticleUnfavorite(this.article.favoriteID);
          this.articleFavorited = false;
          loading.dismiss();
        });
      });
    }
  }

}