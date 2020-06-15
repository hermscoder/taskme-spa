import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterParticipant',
    pure: false
})
export class FilterParticipantPipe implements PipeTransform {
    transform(items: any[], term): any {
        return term 
        	? items.filter(item => item.participants.some(part => part.givenName.toUpperCase().indexOf(term.toUpperCase()) > -1))
            : items;
    }
}