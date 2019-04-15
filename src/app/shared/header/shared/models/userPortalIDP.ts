export class UserPortalIDP {
  hasAvailableIdp: boolean;
  hasSharedIdp: boolean;
  mentorStatus: string;
constructor(data: any) {
  this.hasAvailableIdp = data.has_available_idp;
  this.hasSharedIdp = data.has_shared_idp;
  this.mentorStatus = data.mentor_status;
}
}
