import { Routes } from '@angular/router';
import { OwnPersonalPlanComponent } from './own-personal-plan/own-personal-plan.component';
import { OwnPlanResolver } from './own-personal-plan/shared/providers/own-plan.resolver';

export const routes: Routes = [
  {
    path: 'own/:id',
    component: OwnPersonalPlanComponent,
    resolve: {
      plan: OwnPlanResolver
    }
  }
];


