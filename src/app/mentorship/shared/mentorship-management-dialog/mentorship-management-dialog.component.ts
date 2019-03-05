import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../models/user.model';

export interface DialogData {
  mode: string;
  protege?: any;
  mentor?: any;
  placeholder?: string;
}

const modeMap = {
  addMentor: { is_mentor: false },
  addProtege: { is_protege: true },
  changeMentor: { is_mentor: true },
  assignMentor: { is_mentor: true }
};

@Component({
  selector: 'lt-add-mentor-dialog',
  templateUrl: './mentorship-management-dialog.component.html',
  styleUrls: ['./mentorship-management-dialog.component.scss']
})
export class MentorshipManagementDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService
  ) { }

  filteredOptions$: Observable<User[]>;
  userInput: FormControl = new FormControl('', this.autocompleteSelectionValidator);
  selectedUser: User;

  ngOnInit(): void {
    this.filteredOptions$ = this.userInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => {
          if (value.length === 0) {
            return of([]);
          }
          return this.userService.getUsers({
            name: value,
            ...modeMap[this.data.mode]
          })
            .pipe(
              map((res: any[]) => res.map(user => new User(user))),
              map((res: any[]) => this.tempFilter(res))
            );
        })
      );
  }

  displayFn(user) {
    return user ? user.attributes.fullName : '';
  }

  selectUser(event) {
    this.selectedUser = event.option.value;
  }

  private autocompleteSelectionValidator(control: FormControl): ValidationErrors | null {
    const selection = control.value;
    if (typeof selection === 'string') {
      return { incorrect: true };
    }
    return null;
  }

  // Temporary solution
  private tempFilter(users) {
    return users.filter(user => this.data.mode === 'changeMentor' || this.data.mode === 'assignMentor' ? !!user.attributes.isMentor : !user.attributes.isMentor);
  }

}
