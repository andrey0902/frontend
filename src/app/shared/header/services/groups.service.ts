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

  public static checkGroup(permissions, groupsForCheck: any[]): boolean {
    let permit = false;

    if (permissions) {
      for (const currGroup of permissions) {
        if (groupsForCheck.indexOf(currGroup) !== -1) {
          permit = true;
        }
      }
    }

    return permit;
  }

}
