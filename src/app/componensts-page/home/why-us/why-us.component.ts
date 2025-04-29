import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.css']
})
export class WhyUsComponent implements OnInit {
  features = [
    {
      title: 'Проверенные рецепты',
      description: 'Вы можете найти множество проверенных рецептов, которые помогут вам приготовить вкусные и разнообразные блюда для всей семьи.',
    },
    {
      title: 'Для всех',
      description: 'Вы сможете найти легкие и вкусные блюда, которые понравятся и детям, и взрослым.',
    },
    {
      title: 'Огромное разнообразие',
      description: 'Разнообразие рецептов для всех порадует самых разносторонних гурманов',
    },
    {
      title: 'Храним рецепты для вас',
      description: 'Это отличный способ организовать и хранить свою коллекцию кулинарных рецептов. Вместо того, чтобы хранить бумажные копии или оставлять их в разных кулинарных книгах.',

    }
  ];
  image = 'assets/images/check.png';
  constructor() { }

  ngOnInit() {
  }

}
