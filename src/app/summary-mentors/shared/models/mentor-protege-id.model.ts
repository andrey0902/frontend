export class MentorProtegeId {
  mentorId: number;
  protegeId: number;

  constructor(data) {
    this.mentorId = data.mentorId;
    this.protegeId = data.protegeId;
  }
}
