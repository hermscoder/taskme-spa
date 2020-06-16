import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() {
    //define a new dialog
    alertify.dialog('confirmation',function factory(){
      return{
        main:function(header, message, okCallback){
          this.header = header;
          this.message = message;
          this.okCallback = okCallback;
        },
        setup:function(){
            return { 
              buttons:[{text: "Cancel", key:27, className: 'btn btn-default'},
                        {text: "Confirm", key:13, className: 'btn btn-primary'}
              ],
              focus: { 
                element:1 
              },
              options: {
                maximizable: false
              }

            };
        },
        prepare:function(){
          this.setHeader(this.header);
          this.setContent(this.message);
        },
        callback:function(closeEvent){
            if(closeEvent.index == 1){
              this.okCallback();
            } else {
            }
         }
    }});
  }

  confirmation(title: string, message: string, okCallback: () => any){
    alertify.confirmation(title, message, okCallback,);
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
