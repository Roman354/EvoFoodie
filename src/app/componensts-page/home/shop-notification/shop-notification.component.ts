import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-notification',
  templateUrl: './shop-notification.component.html',
  styleUrls: ['./shop-notification.component.css']
})
export class ShopNotificationComponent implements OnInit {
  showNotification = true;
  constructor() {
    const hasSeenNotification = localStorage.getItem('hasSeenShopNotification');
    this.showNotification = hasSeenNotification ? false : true;
  }

  ngOnInit() {
  }

  closeNotification() {
    this.showNotification = false;
    localStorage.setItem('hasSeenShopNotification', 'true');
  }
}
