import { MentorProtegeId } from './mentor-protege-id.model';

export class ProtegeIteration extends MentorProtegeId {
  iteration: any;

  constructor(data) {
    super(data);
    this.iteration = data.iteration;
  }
}
