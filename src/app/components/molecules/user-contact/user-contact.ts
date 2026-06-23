import { Component, inject } from '@angular/core';
import { Icon } from '../../atoms/icon/icon';
import { Badge } from '../../atoms/badge/badge';
import { Button } from '../../atoms/button/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'molecule-user-contact',
  imports: [RouterLink, Icon, Badge, Button, RouterLink],
  templateUrl: './user-contact.html',
  styleUrl: './user-contact.css',
})
export class UserContact {

  private router = inject(Router);

  protected contactUser() {
    this.router.navigate(['/user']);
  }

}
