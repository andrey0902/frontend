import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MentorshipService {

  constructor() { }

  public addBadge(rout: any[], data: {routName: number, count: any}): any[] {
    return rout.map((item) => {
      if (item.routName === data.routName) {
        item.routeBadge = data.count;
      }
      return item;
    });
  }

  public getObjectLength(data: any): number | null {
    if (data) {
      return Object.values(data).length;
    }
    return null;
  }
}
