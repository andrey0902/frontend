import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {CookieStorageService} from '../../../core/services/cookie-storage.service';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../../root-store/currentUser/current-user.selectors';

@Directive({
  selector: '[ltCanView]'
})

export class CanViewDirective {
  private allPermissionGroups: any;
  private user;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private store: Store<any>,
              private cookieService: CookieStorageService ) {
    this.allPermissionGroups = this.cookieService.permissions;
    this.user = this.store.select(selectCurrentUser);
  }

  @Input()
  set ltCanView(groups: string[] | {}) {
    let permitForView = false;

    if (this.user) {
      if (!Array.isArray(groups)) {
        permitForView = this.checkObjectParameter(groups);
      } else {
        permitForView = this.checkArrayGroups(groups);
      }
    } else {
      permitForView = false;
    }

    if (permitForView) {
      // TODO: find problem with clear
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkObjectParameter(groups) {
    const result = {};

    if (groups.hasOwnProperty('groups')) {
      result['groups'] = this.checkArrayGroups(groups.groups);
    }

    if (groups.hasOwnProperty('ban_groups')) {
      result['ban_groups'] = this.checkArrayGroups(groups.ban_groups, true);
    }

    if (groups.hasOwnProperty('is_author')) {
      result['is_author'] = groups.is_author === this.user.id;
    }

    if (groups.hasOwnProperty('check_author')) {
      result['check_author'] = !!(groups.check_author.some((item) => item.owner.id === this.user.id));
      // console.log(result['check_author']);
    }

    if (groups.hasOwnProperty('not_author')) {
      result['not_author'] = groups.not_author !== this.user.id;
    }

    if (groups.hasOwnProperty('custom_condition')) {
      result['custom_condition'] = groups.custom_condition;
    }

    if (groups.hasOwnProperty('is_condition_important')) {
      result['is_condition_important'] = groups.is_condition_important;
    }

    return (groups.hasOwnProperty('andCondition')) ? this.checkANDCondition(result) : this.checkORCondition(result);
  }

  private checkORCondition(result) {
    let res = false;
    if (result.hasOwnProperty('is_condition_important')) {
      if (!result.is_condition_important) {
        res = this.checkResult(result);
      } else {
        // console.log(result.custom_condition);
        if (!result.custom_condition) {
          res = false;
        } else {
          res = this.checkResult(result);
        }
      }
    } else {
      res = this.checkResult(result);
    }
    return res;
  }

  private checkResult(result) {
    let res = false;
    for (const rule in result) {
      if (result.hasOwnProperty(rule)) {
        res = res ? true : result[rule];
      }
    }
    return res;
  }

  // TODO: delete if unused
  private checkANDCondition(result) {
    let res = true;
    for (const rule in result) {
      if (result.hasOwnProperty(rule)) {
        if (!result[rule]) {
          res = result[rule];
        }
      }
    }
    return res;
  }


  private checkArrayGroups(groups: any, firstState: boolean = false) {
    let result = firstState;
    for (const currGroup of groups) {
      for (const group of this.allPermissionGroups) {
        if (currGroup === group) {
          result = !firstState;
        }
      }
    }
    return result;
  }
}
