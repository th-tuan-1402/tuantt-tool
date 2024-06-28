export default class DateTimeUtils {
    public static formatAsTime(timestamp: number): string {
        if (!timestamp) return '';
        let seconds = Math.floor(timestamp);
        let minutes = Math.floor(timestamp / 60);
        let hours = Math.floor(minutes / 60);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}