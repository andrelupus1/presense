import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  users: Observable<any>;
  posts: Observable<any>;
  constructor(
    public navCtrl: NavController,
    private httpClient: HttpClient,
    private plt: Platform,
    private alertController: AlertController
  ) {
    this.users = this.httpClient.get('https://randomuser.me/api/?results=20')
      .pipe(map(res => res['results']));
    this.posts = this.httpClient.get('https://jsonplaceholder.typicode.com/posts')
    .pipe(map(res => res));
    /*   
    this.posts = [{
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    }]; */
  }
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
    //this.getPosts();
  }
  //getPost
  getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => console.log(json))
  }

  async checkPlatform() {
    let alert = await this.alertController.create({
      header: 'Platforma',
      subHeader: 'Qual a plataforma?',
      message: 'Você está rodando na Plataforma: ' + this.plt.platforms(),
      buttons: ['OK']
    });
    await alert.present();

    if (this.plt.is('cordova')) {
      // Do Cordova stuff
    } else {
      // Do stuff inside the regular browser
    }
  }
}
