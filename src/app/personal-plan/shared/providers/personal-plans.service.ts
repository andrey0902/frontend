import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OwnPlanModel } from '../models/own-plan.model';

const data = {
  'goal': null,
  'owner': {
    'id': 94,
    'first_name': 'Артур',
    'last_name': 'Лопатюков',
    'photo': 'https://light-it-portal-gallery.s3.amazonaws.com:443/users/94/fullsize/photo_dc94715c_lopatyukov.png',
    'photo_thumbnail': 'https://light-it-portal-gallery.s3.amazonaws.com:443/users/94/thumbnail/photo_6eb38da9_lopatyukov.png',
    'is_approved': true,
    'is_dismissed': false,
    'birth_date': '1992-09-26',
    'skills_know': [ {'id': 2, 'name': 'JavaScript', 'group_id': 1}, {'id': 4, 'name': 'CSS', 'group_id': 1}, {'id': 5, 'name': 'HTML', 'group_id': 1}, {
      'id': 7,
      'name': 'jQuery',
      'group_id': 5
    }, {'id': 9, 'name': 'Git', 'group_id': 9}, {'id': 28, 'name': 'JSON', 'group_id': 1}, {'id': 30, 'name': 'AJAX', 'group_id': 11}, {
      'id': 56,
      'name': 'Angular.js',
      'group_id': 5
    }, {'id': 83, 'name': 'CoffeeScript', 'group_id': 1}, {'id': 88, 'name': 'LESS', 'group_id': 1}, {'id': 89, 'name': 'SASS', 'group_id': 1}, {
      'id': 107,
      'name': 'Twitter Bootstrap',
      'group_id': 5
    }, {'id': 166, 'name': 'Visual Studio', 'group_id': 8}, {'id': 182, 'name': 'Firebug', 'group_id': 10}, {'id': 248, 'name': 'SCSS', 'group_id': 1}, {
      'id': 268,
      'name': 'VirtualBox',
      'group_id': 10
    }, {'id': 282, 'name': 'VMware', 'group_id': 10}, {'id': 330, 'name': 'Unit tests', 'group_id': 12}, {'id': 345, 'name': 'Adobe Photoshop', 'group_id': 10}, {
      'id': 404,
      'name': 'Sublime',
      'group_id': 8
    }, {'id': 405, 'name': 'PHPStorm', 'group_id': 8}, {'id': 410, 'name': 'Trello', 'group_id': 9}, {'id': 411, 'name': 'Taiga', 'group_id': 9}, {
      'id': 413,
      'name': 'Asana',
      'group_id': 9
    }, {'id': 428, 'name': 'Gulp', 'group_id': 10}, {'id': 429, 'name': 'Webpack', 'group_id': 10}, {'id': 431, 'name': 'WebStorm', 'group_id': 8}, {
      'id': 436,
      'name': 'TypeScript',
      'group_id': 1
    } ],
    'specialization': 'Node.js Fullstack Developer',
    'skills_inform': [ {'id': 1, 'name': 'MySQL', 'group_id': 7}, {'id': 3, 'name': 'Linux', 'group_id': 6}, {'id': 6, 'name': 'PHP', 'group_id': 1}, {
      'id': 8,
      'name': 'SQL',
      'group_id': 1
    }, {'id': 15, 'name': 'OOP/OOD', 'group_id': 13}, {'id': 17, 'name': 'MongoDB', 'group_id': 7}, {'id': 22, 'name': 'MVC', 'group_id': 11}, {
      'id': 32,
      'name': 'Jira',
      'group_id': 9
    }, {'id': 34, 'name': 'Scrum', 'group_id': 13}, {'id': 38, 'name': 'Redis', 'group_id': 10}, {'id': 45, 'name': 'REST API', 'group_id': 11}, {
      'id': 57,
      'name': 'Design Patterns',
      'group_id': 13
    }, {'id': 59, 'name': 'Apache', 'group_id': 10}, {'id': 63, 'name': 'Node.js', 'group_id': 1}, {'id': 68, 'name': 'Nginx', 'group_id': 10}, {
      'id': 78,
      'name': 'Wordpress',
      'group_id': 2
    }, {'id': 90, 'name': 'bash', 'group_id': 1}, {'id': 106, 'name': 'Ubuntu', 'group_id': 6}, {'id': 118, 'name': 'Patterns', 'group_id': 13}, {
      'id': 119,
      'name': 'BDD',
      'group_id': 13
    }, {'id': 123, 'name': 'UI/UX', 'group_id': 13}, {'id': 124, 'name': 'TCP/IP', 'group_id': 11}, {'id': 130, 'name': 'NoSQL', 'group_id': 11}, {
      'id': 132,
      'name': 'TeamCity',
      'group_id': 10
    }, {'id': 145, 'name': 'Kanban', 'group_id': 13}, {'id': 149, 'name': 'HTTP', 'group_id': 11}, {'id': 165, 'name': 'IIS', 'group_id': 10}, {
      'id': 177,
      'name': 'Xcode',
      'group_id': 8
    }, {'id': 215, 'name': 'Test driven development (TDD)', 'group_id': 13}, {'id': 219, 'name': 'SOLID', 'group_id': 11}, {'id': 221, 'name': 'Grunt', 'group_id': 10}, {
      'id': 227,
      'name': 'DNS',
      'group_id': 11
    }, {'id': 234, 'name': 'DHCP', 'group_id': 11}, {'id': 269, 'name': 'Matlab', 'group_id': 10}, {'id': 274, 'name': 'Adobe Illustrator', 'group_id': 10}, {
      'id': 277,
      'name': 'Waterfall',
      'group_id': 13
    }, {'id': 284, 'name': 'Laravel', 'group_id': 2}, {'id': 285, 'name': 'Underscore.js', 'group_id': 5}, {'id': 310, 'name': 'Open Source', 'group_id': 13}, {
      'id': 324,
      'name': 'Angular.js 2',
      'group_id': 5
    }, {'id': 327, 'name': 'ReactJS', 'group_id': 5}, {'id': 328, 'name': 'Ionic', 'group_id': 4}, {'id': 341, 'name': 'OAuth/OAuth2', 'group_id': 11}, {
      'id': 348,
      'name': 'Agile Methodologies',
      'group_id': 13
    }, {'id': 367, 'name': 'Graphic Design', 'group_id': 13}, {'id': 377, 'name': 'Networking', 'group_id': 11}, {'id': 415, 'name': 'Cordova', 'group_id': 4}, {
      'id': 430,
      'name': 'Browserify',
      'group_id': 10
    }, {'id': 432, 'name': 'Android Studio', 'group_id': 8} ],
    'hobbies': [ {'id': 20, 'name': 'кино, театр, концерты', 'group_id': 2} ],
    'mentor_status': 'не ментор',
    'protege_status': 'не протеже',
    'mentor': null,
    'proteges': [],
    'worked_time': {'years': 2, 'months': 9, 'days': 19}
  },
  'editable': true,
  'prof': [],
  'personal': [],
  'desire': [],
  'tasks': [ {'id': 789, 'text': 'sdsa', 'parent': null, 'order': 3, 'status': 'open', 'is_completed': false}, {
    'id': 790,
    'text': 'Docker',
    'parent': null,
    'order': 0,
    'status': 'open',
    'is_completed': false
  }, {
    'id': 771,
    'text': 'Node.js',
    'parent': null,
    'order': 1,
    'status': 'open',
    'is_completed': false
  }, {'id': 782, 'text': 'Databases', 'parent': null, 'order': 2, 'status': 'open', 'is_completed': false}, {
    'id': 772,
    'text': 'Основы',
    'parent': 771,
    'order': 0,
    'status': 'open',
    'is_completed': false
  }, {'id': 775, 'text': 'Frameworks', 'parent': 771, 'order': 1, 'status': 'open', 'is_completed': false}, {
    'id': 779,
    'text': 'ORM',
    'parent': 771,
    'order': 2,
    'status': 'open',
    'is_completed': false
  }, {'id': 788, 'text': 'Backpack', 'parent': 772, 'order': 0, 'status': 'open', 'is_completed': false}, {
    'id': 789,
    'text': 'Typescript (ts-node)',
    'parent': 772,
    'order': 1,
    'status': 'open',
    'is_completed': false
  }, {'id': 776, 'text': 'Express', 'parent': 775, 'order': 0, 'status': 'open', 'is_completed': false}, {
    'id': 777,
    'text': 'Koa',
    'parent': 775,
    'order': 1,
    'status': 'open',
    'is_completed': false
  }, {'id': 778, 'text': 'NestJs', 'parent': 775, 'order': 2, 'status': 'open', 'is_completed': false}, {
    'id': 780,
    'text': 'TypeORM',
    'parent': 779,
    'order': 0,
    'status': 'open',
    'is_completed': false
  }, {'id': 781, 'text': 'Sequelize', 'parent': 779, 'order': 1, 'status': 'open', 'is_completed': false}, {
    'id': 783,
    'text': 'MongoDB',
    'parent': 782,
    'order': 0,
    'status': 'open',
    'is_completed': false
  }, {'id': 784, 'text': 'MySQL', 'parent': 782, 'order': 1, 'status': 'open', 'is_completed': false}, {
    'id': 785,
    'text': 'PostgreSQL',
    'parent': 782,
    'order': 2,
    'status': 'open',
    'is_completed': false
  }, {'id': 786, 'text': 'Mongoose', 'parent': 783, 'order': 0, 'status': 'open', 'is_completed': false}, {
    'id': 787,
    'text': 'SQL',
    'parent': 784,
    'order': 0,
    'status': 'open',
    'is_completed': false
  }, {'id': 791, 'text': 'Конфигурации', 'parent': 790, 'order': 0, 'status': 'open', 'is_completed': false}, {
    'id': 792,
    'text': 'docker-compose',
    'parent': 790,
    'order': 1,
    'status': 'open',
    'is_completed': false
  } ]
};

@Injectable()
export class PersonalPlansService {

  constructor() {
  }


  public getOwn(id: number) {
    return of(data).pipe(
      map((response: any) => new OwnPlanModel(response))
    );
    /*return this.http.get(ConfigService.availablePlansPath + `${id}/`)
      .pipe(
        map((response: any) => new OwnPlanModel(response)),
        catchError((err) => this.errorService.getErrors(err))
      );*/
  }


}
