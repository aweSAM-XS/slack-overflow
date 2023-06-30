import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate',
  standalone: true,
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: Date): string {
    const currentTime = new Date().getTime();
    const targetTime = new Date(value).getTime();
    const diffInMilliseconds = currentTime - targetTime;

    if (diffInMilliseconds < 0) {
      return 'Future date';
    } else if (diffInMilliseconds < 1000 * 60) {
      const seconds = Math.floor(diffInMilliseconds / 1000);
      return `${seconds} seconds ago`;
    } else if (diffInMilliseconds < 1000 * 60 * 60) {
      const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
      return `${minutes} minutes ago`;
    } else if (diffInMilliseconds < 1000 * 60 * 60 * 24) {
      const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      return `${days} days ago`;
    }
  }
}
