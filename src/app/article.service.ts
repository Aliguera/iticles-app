import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Article } from 'src/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private aFirestore: AngularFirestore) { }

  addArticle(article: Article, articleID: string): Promise<void> {
    return this.aFirestore.doc(`articleList/${articleID}`).set(article);
  }

  getArticles() {
    return this.aFirestore.collection('articleList');
  }

  favoriteArticle(articleFavorite: any, id: string): Promise<void> {
    return this.aFirestore.doc(`favoriteList/${id}`).set(articleFavorite);
  }

  getUserFavoriteArticles(userID): AngularFirestoreCollection {
    return this.aFirestore.collection('favoriteList', ref => ref.where('userID', '==', userID));
  }

  checkArticleFavorite(articleID): AngularFirestoreCollection {
    return this.aFirestore.collection('favoriteList', ref => ref.where('id', '==', articleID));
  }

  checkArticleUnfavorite(favoriteID) {
    return this.aFirestore.doc(`favoriteList/${favoriteID}`).delete();
  }
}
