import { type ClassValue, clsx } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(createdAt: string) {
  const today = moment(Date.now());
  const postDate = moment(createdAt);
  const diffInDays = today.diff(postDate, 'days');
  const diffInWeeks = today.diff(postDate, 'weeks');
  const diffInYears = today.diff(postDate, 'years');
  const diffInHrs = today.diff(postDate, 'hours');
  const diffInMins = today.diff(postDate, 'minutes');
  if (diffInMins < 1) {
    return 'Just now';
  } else if (diffInMins < 60) {
    return `${diffInMins} mins ago`;
  } else if (diffInMins >= 60 && diffInHrs < 24) {
    return `${diffInHrs} hours ago`;
  } else if (diffInHrs >= 24 && diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays >= 7 && diffInWeeks < 52) {
    return `${diffInWeeks} weeks ago`;
  } else {
    return `${diffInYears} years ago`;
  }
}
