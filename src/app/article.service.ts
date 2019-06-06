import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Article } from 'src/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private aFirestore: AngularFirestore) { }

  addArticle(article: Article): Promise<void> {
    const id = this.aFirestore.createId();
    return this.aFirestore.doc(`articleList/${id}`).set(article);
  }

  getArticles() {
    return this.aFirestore.collection('articleList');
  }
}
