import {Pipe, PipeTransform} from '@angular/core';

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

@Pipe({
    name: 'filterUsers',
    pure: false
})
export class FilterUsersPipe implements PipeTransform {
    transform(applicationsArray: any[], term: string, showOnlyApprovedApplicants: boolean = false): any {
        return term
            ? applicationsArray.filter((application) => {
                return (application.user.givenName + ' ' + application.user.familyName).toUpperCase().indexOf(term.toUpperCase()) > -1 &&
                    ((showOnlyApprovedApplicants && application.taskApplicationStatus === 'ACCEPTED') || (!showOnlyApprovedApplicants));
            })
            : applicationsArray.filter((application) => {
                return (showOnlyApprovedApplicants && application.taskApplicationStatus === 'ACCEPTED') || (!showOnlyApprovedApplicants);
            });
    }
}

