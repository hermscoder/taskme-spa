export class DateUtils {

    static convertStringToDate(strDate: string): Date {
        if (strDate == null || strDate.trim() === '') {
            return null;
        }
        const convDate = new Date(strDate);
        return new Date(convDate.getTime() + Math.abs(convDate.getTimezoneOffset() * 60000));
    }


}
