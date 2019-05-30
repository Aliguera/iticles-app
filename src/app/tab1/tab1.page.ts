import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Article } from './../../models/article';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavigationExtras } from '@angular/router/src/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  articles: Article[] = [
    {
      id: 1,
      title: "Article 1",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra nibh id felis pulvinar, at sagittis ante sagittis. Curabitur cursus urna vitae risus varius, ac venenatis diam cursus. Ut quis auctor orci. Aliquam gravida pretium est ut condimentum. Proin dui orci, efficitur commodo faucibus porta, iaculis vitae turpis. Donec nec mauris consectetur, semper justo vitae, semper dui. Nulla sit amet diam nisi. Nam vel mi a arcu varius elementum sit amet eu urna. Maecenas ac risus nisi. Ut venenatis felis nisi, et interdum dui semper et. Duis dapibus, neque vel vehicula porttitor, leo leo fringilla diam, ac volutpat leo orci ut diam. In sollicitudin ante justo, ac elementum metus gravida at. Donec nec massa vitae turpis dapibus commodo. Vestibulum sem ipsum, egestas sit amet velit sit amet, tincidunt imperdiet eros. Nullam vitae eros metus. Etiam eu dapibus ipsum.",
      created_at: "23/05/18 05:50:20pm",
      favorite: false,
      picture_path: "../../assets/imgs/articles/article1.png",
      subject: "technology"
    },
    {
      id: 2,
      title: "Article 2",
      body: "Vivamus nec risus a dui aliquet elementum. Vestibulum lacinia efficitur tellus, ac volutpat nisl maximus sed. Nullam ac felis et velit suscipit tincidunt id eget quam. Quisque accumsan nulla nulla, quis pretium lectus finibus id. Nullam ullamcorper ut ipsum id pulvinar. Suspendisse et venenatis lorem. Duis aliquam rhoncus massa a fermentum. Nam sed arcu ac est convallis convallis. Vivamus eu velit elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc ac est congue, feugiat ipsum quis, cursus tellus. Duis eu neque bibendum, porta nulla ac, facilisis justo. Curabitur aliquam molestie laoreet. Mauris vel suscipit leo.",
      created_at: "28/07/17 10:23:19am",
      favorite: true,
      picture_path: "../../assets/imgs/articles/article2.jpg",
      subject: "medicine"
    },
    {
      id: 3,
      title: "Article 3",
      body: "Pellentesque ullamcorper scelerisque quam quis porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam dictum, tellus id lobortis commodo, sem quam interdum tellus, ut dictum enim nisi nec ex. Donec vitae pellentesque mi, vel sollicitudin nunc. Phasellus euismod gravida massa a ullamcorper. Duis dignissim, augue vel viverra pellentesque, sapien elit fermentum purus, non dapibus dui diam ut erat. Nulla venenatis lobortis pellentesque. Aenean cursus mollis est porttitor tempus. Nulla commodo auctor ligula, sit amet pulvinar massa porta sit amet. Suspendisse et hendrerit lacus. In hac habitasse platea dictumst. Pellentesque eu cursus lectus. Praesent placerat mi lectus, vel consequat nisi semper sed. Quisque sodales iaculis dolor, sed malesuada quam egestas ac.",
      created_at: "30/05/19 07:44:59pm",
      favorite: true,
      picture_path: "../../assets/imgs/articles/article3.png",
      subject: "food"
    },
  ];

  constructor(private ofAuth: AngularFireAuth, 
              private navCtrl: NavController,
              private router: Router,
              private dataService: DataService) {}

  ionViewWillEnter() {
    this.ofAuth.authState.subscribe(data => { console.log("kdoawopd" + data.email) });
  }

  wrapString(body: string) {
    if (body.length > 50) {
      return body.substring(0, 60) + '...';
    } 
  }

  openDetails(article) {
    this.dataService.setData(article.id, article);
    console.log(article);
    this.router.navigateByUrl('/article-details/' + article.id);
  }

}
