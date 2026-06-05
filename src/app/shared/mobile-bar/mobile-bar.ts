import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-bar',
  imports: [],
  templateUrl: './mobile-bar.html',
  styleUrl: './mobile-bar.css',
})
export class MobileBar {
    indicatorTransform = 'translateX(0px)';

  updateIndicator(index: number) {
    const width = window.innerWidth / 3;
    this.indicatorTransform =
      `translateX(${width * index + width / 2 - 25}px)`;
  }
}
