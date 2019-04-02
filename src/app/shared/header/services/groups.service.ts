import {CookieService} from 'ngx-cookie-service';

export class GroupsService {

  public static PERMISSION_GROUPS = {
    NOT_APPROVED: 'not_approved',
    ADMIN_NEWS: 'admin_news',
    ADMIN_VOTES: 'admin_votes',
    VACATIONS_FOR_REVIEWERS: 'vacations_for_rewievers',
    VACATIONS_FOR_MANAGER: 'vacations_for_manager',
    READ_TRUST_BOX: 'read_trust_box',
    ADMIN_MEETUPS: 'admin_meetups',
    ADMIN_REPORT: 'admin_report',
    ALL_IPR: 'all_ipr',
    MENTOR_TABLE_EDIT: 'mentor_table_edit',
    ADMIN_PEOPLES: 'admin_peoples',
    ADMIN_ALBUMS: 'admin_albums',
    ADMIN_MONEY: 'admin_money',
    ADMIN_LOCATION: 'admin_location',
    VACATION_REVIEWERS: 'vacation_reviewers',
    VACATION_FOR_MANAGER: 'vacation_for_manager',
    SECURITY: 'security'
  };

  public static checkGroup(groupsForCheck: any[], groups): boolean {
    let permit = false;

    if (groups) {
      for (const currGroup of groups) {
        if (groupsForCheck.indexOf(currGroup) !== -1) {
          permit = true;
        }
      }
    }

    return permit;
  }

  public static get_nav_links(path: string) {
    return {
      goal: `${path}about-company/mission`,
      info: `${path}about-company/inform`,
      codex: `${path}about-company/dev-codex`,
      rules: `${path}about-company/rules`,
      faq: `${path}about-company/FAQ`,
      employees: `${path}employees`,
      birthdays: `${path}birthdays`,
      places: `${path}locator`,
      available_ipr: `${path}plans/available`,
      manual: 'https://drive.google.com/file/d/183bGWXUgQrt-z8VX_wLKZXCdthGMAT0y/view',
      albums: `${path}gallery`,
      reports: `${path}meetups/all`,
      wiki: 'http://wiki.light-it.loc/',
      devices: `${path}testing-devices`,
      admin_letter: `${path}admin-trustbox`,
      letter: `${path}trustbox`,
      profile: `${path}edit-profile`,
      my_tasks: `${path}plans/own`,
      my_vacations: `${path}vacations`,
      wage: `${path}salary`,
      users: `${path}admin-users-panel`,
      vacations: `${path}admin-vacations-panel`
    };
  }
}
