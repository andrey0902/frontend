export interface User {
  type: string;
  id: string;
  attributes: {
    first_name: string;
    last_name: string;
    photo: string;
    photo_thumbnail: string;
    is_mentor: boolean;
    portal_id: number;
    slack: string;
    specialization_id: number;
    proteges: any[]
    // need_mentor?: boolean;
    // want_be_mentor?: boolean;
    links: {
      self: string;
    }
  };
}
