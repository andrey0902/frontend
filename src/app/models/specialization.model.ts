
export class Specialization {
  type: string;
  id: string;
  attributes: {
    name: string;
    title: string;
  };

  constructor(data) {
    this.type = data.type;
    this.id = data.id;
    this.attributes = data.attributes;
  }
}
