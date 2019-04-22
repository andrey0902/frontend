import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapLink',
  pure: true
})

export class WrapLinkPipe implements PipeTransform {
  constructor() {
  }

  public transform(content) {
    if (!content) {
      return '';
    }
    const reg = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/mig;

    content = content.replace(reg, (s) => {
      const str = (/:\/\//.exec(s) === null ? 'http://' + s : s );
      return '<a class=\"blue-text text-darken-1\" target="_blank" href=\'' + str + '\'>' + str + '</a>';
    });

    return content;
  }
}
