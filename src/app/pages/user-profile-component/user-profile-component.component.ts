import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSidebar } from '../../components/organisms/user-sidebar/user-sidebar';

@Component({
  selector: 'app-user-profile-component',
  imports: [UserSidebar,RouterOutlet],
  templateUrl: './user-profile-component.component.html',
  styleUrl: './user-profile-component.component.css',
})
export class UserProfileComponentComponent {

}
