import { InfoPlanModel } from './info-plan.model';

export class OwnPlanModel {
  public desire: InfoPlanModel[];
  public editable: boolean;
  public goal: {};
  public personal: InfoPlanModel[];
  public prof: InfoPlanModel[];
  public tasks: InfoPlanModel[];
  public owner: any;

  constructor(data) {
    this.desire = this.infoPlans(data.desire);
    this.editable = data.editable;
    this.goal = {goal: 'goal', text: data.goal};
    this.personal = this.infoPlans(data.personal);
    this.prof = this.infoPlans(data.prof);
    this.tasks = this.infoPlans(data.tasks);
    this.owner = data.owner;
  }

  private infoPlans(informs) {
    if (!informs) {
      return [];
    }
    return informs.map(info => new InfoPlanModel(info));
  }
}
