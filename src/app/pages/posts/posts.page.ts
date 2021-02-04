import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  page = 1;
  posts = [];
  totalPosts = 0;

  constructor(private api: ApiService) { }


  loadPosts() {
    this.api.getPosts(this.page).subscribe((res) => {
      this.totalPosts = res.totalPosts;
      this.posts = res.posts;
      console.log('loadPosts: ', res);
    });
  }

  ngOnInit() {
    this.loadPosts();
  }
}
