import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {AbstractControl, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../models/user.model';
import {LtValidators} from '../../helpers/validator-methods.static';
import {tap} from 'rxjs/internal/operators/tap';

export interface DialogData {
  mode: string;
  protege?: any;
  mentor?: any;
  placeholder?: string;
}

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

  modeMap = {
    addMentor: { is_mentor: 0 },
    addProtege: { is_protege: 0, exclude: this.data.mentor && this.data.mentor.id },
    changeMentor: { is_mentor: 1, exclude: this.data.mentor && this.data.mentor.id },
    assignMentor: { is_mentor: 1 }
  };
  filteredOptions$: Observable<User[]>;
  userInput: FormControl = new FormControl('', [LtValidators.noWhitespaceValidator, Validators.required]);
  selectedUser: User;

  ngOnInit(): void {
    this.filteredOptions$ = this.userInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => {
          if (this.userInput.invalid) {
            return of([]);
          }
          return this.userService.getUsers({
            name: value,
            ...this.modeMap[this.data.mode]
          })
            .pipe(
              map((res: any[]) => res.map(user => new User(user)))
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
}
