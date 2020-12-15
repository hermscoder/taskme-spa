import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
	@Input() msgStateType: string; //A - Acceptation, D - Declined, AP - Applying
	@Input() relatedId: string
	@Input() messageTo: string;
	@Input() defaultMsg: string;

  constructor(private alertify: AlertifyService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onClickSendEvent(msg){
  	if(msg.length < 20){
			this.alertify.error('Your message must have more than 20 characters.');
  	} else {
      var that = this;
      this.alertify.confirmation('Confirmation', that.getConfirmationMessage(this.msgStateType), () => {
        var object = {
          msg: msg,
          msgStateType: that.msgStateType,
          relatedId: that.relatedId
        };
        that.activeModal.close(object);
      });
  	}
  }

  getConfirmationMessage(msgStateType): string{
    var confirmationMsg = '';
    if(msgStateType == 'A'){
      confirmationMsg = 'Do you confirm that <b>' + this.messageTo + '</b> is a good candidate for your task and you will approve this application?';
    } else if (msgStateType == 'AP') {
      confirmationMsg = 'Do you confirm that you want to apply for this task and send a message to <b>' + this.messageTo + '</b>?';
    } else {
      confirmationMsg = 'Do you confirm that <b>' + this.messageTo + '</b> is not suitable for your task and you will decline this application?';
    }
    return confirmationMsg;
  }

  onCancelEvent(){
 		this.closeModal();
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
