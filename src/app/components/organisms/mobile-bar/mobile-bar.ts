import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LinkIcon } from '../../atoms/link-icon/link-icon';

@Component({
  selector: 'app-mobile-bar',
  imports: [LinkIcon],
  templateUrl: './mobile-bar.html',
  styleUrl: './mobile-bar.css',
})
export class MobileBar {

}
