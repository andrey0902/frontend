import {InfoPlanModel} from '../personal-plan/shared/models/info-plan.model';

export class Iteration {
  id: number;
  user_id: number;
  goal: string;
  startDate: Date;
  endDate: Date;
  format = 'YYYY-MM-DD';
  activities: Activity[];
  plan: InfoPlanModel[];

  constructor(config) {
    this.id = config.id;
    this.user_id = config.attributes.user_id;
    this.goal = config.attributes.goal;
    this.startDate = config.attributes.start_date;
    this.endDate = config.attributes.end_date;
  }
}

export interface Activity {
  type: 'meeting' | 'deploy';
  title: string;
  date: Date;
}
