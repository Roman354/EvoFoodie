import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-like-modal',
  templateUrl: './like-modal.component.html',
  styleUrls: ['./like-modal.component.css']
})
export class LikeModalComponent implements OnInit {

  @Input() showLikeMessage = false;
  @Output() close = new EventEmitter<void>();
  image = 'assets/images/check.png';
  constructor() { }

  ngOnInit() {
  }
  onClose() {
    this.close.emit();
  }
}
