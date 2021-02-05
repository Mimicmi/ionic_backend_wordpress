import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private api: ApiService) { }

  appPages = [
    {
      title: 'The News',
      url: '/posts',
      icon: 'newspaper'
    }
  ]

  ngOnInit() {
    this.api.getPages().subscribe((pages) => {
      console.log('OnInit Pages Wordpress', pages);
      this.appPages = [...this.appPages, ...pages];
    });
  }
}
