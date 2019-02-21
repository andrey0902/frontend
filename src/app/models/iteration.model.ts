export class Iteration {
  id: number;
  goal: string;
  startDate: Date;
  endDate: Date;
  format = 'YYYY-MM-DD';
  activities: Activity[];
}

export interface Activity {
  type: 'meeting' | 'deploy';
  title: string;
  date: Date;
}
