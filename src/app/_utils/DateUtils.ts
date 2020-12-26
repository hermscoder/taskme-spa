export class DateUtils {

    static convertStringToDate(strDate: any): Date {
        if (strDate == null || (strDate+'').trim() === '') {
            return null;
        }
        const convDate = new Date(strDate);
        return new Date(convDate.getTime() + Math.abs(convDate.getTimezoneOffset() * 60000));
    }

    static datediffInDays(first, second, absoluteValue: boolean = true): number {
        if(absoluteValue) {
            return Math.abs(Math.round((second - first) / (1000 * 60 * 60 * 24)));
        } else {
            return Math.round((second - first) / (1000 * 60 * 60 * 24));
        }
        
    }

    static convertDateToRequestParamString(date: Date) {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
    }
    
    static addDays(date, days): Date {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}
