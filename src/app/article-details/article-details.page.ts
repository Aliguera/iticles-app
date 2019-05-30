import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {
  article: any = {};

  constructor(private route: ActivatedRoute, private router: Router) { }

  ionViewWillEnter(){
    if (this.route.snapshot.data['article']) {
      this.article = this.route.snapshot.data['article'];
    }
  }

  ngOnInit() {
  }

}
