import { Component, Input, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/_models/UserDTO';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
	selector: 'app-user-rate',
	templateUrl: './user-rate.component.html',
	styleUrls: ['./user-rate.component.css']
})
export class UserRateComponent implements OnInit {

	@Input() user: UserDTO;
	@Input() editable: boolean = false;

	constructor(private userService: UserService, private alertify: AlertifyService) { }

	ngOnInit() {
	}

	rate(rate: number) {
		this.userService.rateUser(this.user.id, rate).subscribe(()=>{
		  this.alertify.success("User rated sucessfully!");
		});
	}

	getRateForStars(rateAvg: number): number {
		return parseInt(rateAvg + '');
	}

	getTooltipForRate(rateAvg: number): string {
		let stars = this.getRateForStars(rateAvg);
		if (stars == 0) {
			return 'No rates'
		} else if (stars == 1) {
			return '1 star'
		}

		return stars + ' stars';

	}
}
