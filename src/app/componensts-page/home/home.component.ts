// import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title,
    private store: Store
  ) { }
  ngOnInit() {
    const token = this.store.select(state => state.auth.token);
    this.title.setTitle('Foodie: Главная');
    this.meta.addTags([
      { name: 'description', content: 'Сборник кулинарных рецептов, для всей семьи' },
      { property: 'og:description', content: 'Сборник кулинарных рецептов, для всей семьи' }
    ]);
  }
}
