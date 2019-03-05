import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any): string {
    const diffMs = Date.now() - Number(new Date(value));
    const diffYears = Math.floor(diffMs / 31536000000);
    const diffMonths = Math.floor(diffMs / 2592000000);
    const diffWeeks = Math.floor(diffMs / 604800000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    const diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000);

    let result = diffMins ? `${diffMins} minute${this.getSuffix(diffMins)} ago` : 'just now';
    result = diffHrs ? `${diffHrs} hour${this.getSuffix(diffHrs)} ago` : result;
    result = diffDays ? `${diffDays} day${this.getSuffix(diffDays)} ago` : result;
    result = diffWeeks ? `${diffWeeks} week${this.getSuffix(diffWeeks)} ago` : result;
    result = diffMonths ? `${diffMonths} month${this.getSuffix(diffMonths)} ago` : result;
    result = diffYears ? `${diffYears} year${this.getSuffix(diffYears)} ago` : result;

    return result;
  }

  /**
   * Определить значение суффикса для периода
   * @param count - колличество (лет, месяцев, недель, дней, часов, минут)
   */
  private getSuffix(count: number): string {
    return count > 1 ? 's' : '';
  }

}
