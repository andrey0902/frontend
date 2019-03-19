import {InfoPlanModel} from '../personal-plan/shared/models/info-plan.model';

export class Iteration {
  id: number;
  user_id: number;
  goal: string;
  testProject: string;
  startDate: Date;
  endDate: Date;
  meets: any[];
  format = 'YYYY DD.MM';
  plan: InfoPlanModel[];
  activities = [];

  constructor(config) {
    this.id = config.id;
    this.user_id = config.attributes.user_id;
    this.goal = config.attributes.goal;
    this.startDate = config.attributes.start_date;
    this.endDate = config.attributes.end_date;
    this.testProject = config.attributes.test_project;
    this.meets = config.attributes.meets;
  }
}
