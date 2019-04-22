export class MentorProtegeId {
  mentorId: string;
  protegeId: string;

  constructor(data) {
    this.mentorId = data.mentorId;
    this.protegeId = data.protegeId;
  }
}
