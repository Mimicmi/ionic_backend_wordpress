import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  page = 1;
  posts = [];
  totalPosts = 0;
  totalPages = 0;

  constructor(private api: ApiService,
    public loadingCtrl: LoadingController
  ) { }


  async loadPosts(infiniteScroll = null) {

    let loading = null;

    if (!infiniteScroll) {
      loading = await this.loadingCtrl.create({
        message: "loading posts"
      });
      await loading.present();
    }

    this.api.getPosts(this.page).subscribe((res) => {

      if (infiniteScroll) {
        infiniteScroll.target.complete();
        this.posts = [...this.posts, ...res.posts];

        if (this.page == this.totalPages) {
          infiniteScroll.target.disabled = true;
        }
      } else {
        this.posts = res.posts;
      }

      this.totalPages = res.pages;
      this.totalPosts = res.totalPosts;
      console.log('loadPosts: ', res);

    }, err => {
      console.log('Error in loadPosts', err)
    }, () => {
      if (!infiniteScroll) {
        loading.dismiss();
      }
    });
  }

  loadMore(event) {
    this.page++;
    this.loadPosts(event);
  }

  ngOnInit() {
    this.loadPosts();
  }
}
