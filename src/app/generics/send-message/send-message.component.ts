import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
	@Input() msgStateType: string; //A - Acceptation, D - Declined, A - Applying
	@Input() relatedId: string
	@Input() messageTo: string;
	@Input() defaultMsg: string;

  constructor(private alertify: AlertifyService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onClickSendEvent(msg){
  	if(msg.length < 20){
			this.alertify.error('Your message must have more than 20 characters.')
  	} else {
			var object = {
				msg: msg,
				msgStateType: this.msgStateType,
				relatedId: this.relatedId
			};
			this.activeModal.close(object);
  	}
  }

  onCancelEvent(){
 		this.closeModal();
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
