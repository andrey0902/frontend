import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OwnPlanModel } from '../../../shared/models/own-plan.model';
import { PersonalPlansService } from '../../../shared/providers/personal-plans.service';


@Injectable()
export class OwnPlanResolver implements Resolve<OwnPlanModel> {
  constructor(private personalPlansService: PersonalPlansService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OwnPlanModel> {
    const id = route.params.id;
    return this.personalPlansService.getOwn(id);

  }
}
