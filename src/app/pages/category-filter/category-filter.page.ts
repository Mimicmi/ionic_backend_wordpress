import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.page.html',
  styleUrls: ['./category-filter.page.scss'],
})
export class CategoryFilterPage implements OnInit {
  categories = [];
  selected = null;

  constructor(
    private api: ApiService,
    private popOver: PopoverController
  ) { }

  ngOnInit() {
    this.api.getCategories().subscribe(res => {
      console.log('getCategories test: ', res);
      this.categories = res;
      this.categories.unshift({ id: null, name: 'All' });
    })
  }

  selectCat(cat) {
    this.popOver.dismiss(cat);
  }
}
