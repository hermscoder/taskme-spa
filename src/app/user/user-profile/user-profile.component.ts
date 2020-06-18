import { Component, OnInit, Input } from '@angular/core';
import { UserDTO } from '../../_models/UserDTO';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	@Input() user: any;

  constructor() { }

  ngOnInit() {
  }
  
}
