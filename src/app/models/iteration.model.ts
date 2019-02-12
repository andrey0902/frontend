export class Iteration {
  id: number;
  goal: string;
  startDate: number;
  endDate: number;
  activities: Activity[];
}

export interface Activity {
  type: 'meeting' | 'deploy';
  title: string;
  date: number;
}
