import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingController, PopoverController } from '@ionic/angular';
import { CategoryFilterPage } from '../category-filter/category-filter.page';


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
  categoryFilter = null;

  constructor(private api: ApiService,
    private loadingCtrl: LoadingController,
    private popOver: PopoverController
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

  async openFilter(event) {
    const popover = await this.popOver.create({
      component: CategoryFilterPage,
      event: event,
      translucent: false,
      componentProps: {
        selected: this.categoryFilter
      }
    });
    popover.onDidDismiss().then((res) => {
      console.log('after popover', res);
      if (res && res.data) {
        this.categoryFilter = res.data.id;
      }
    })
    await popover.present();
  }

  ngOnInit() {
    this.loadPosts();
  }
}
