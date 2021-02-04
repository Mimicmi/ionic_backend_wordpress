import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

import { Plugins } from '@capacitor/core';

const { Share } = Plugins;

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  post: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  async sharePost() {
    await Share.share({
      title: this.post.title.rendered,
      text: 'Check my post !',
      url: this.post.link,
      dialogTitle: 'Share with buddies'
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('postId', id);
    this.api.getPostContent(id).subscribe((res) => {
      console.log('postContent', res);
      this.post = res;
    });
  }
}
