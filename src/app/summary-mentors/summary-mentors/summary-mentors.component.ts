import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from '../../shared/dialog/services/dialog.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UsersMap } from '../../models/user.model';
import { selectMentors, selectMentorsLoad } from '../../root-store/mentors/mentors.selectors';
import { LoadMentors, LoadProtegeIteration } from '../../root-store/mentors/mentors.actions';
import { filter, map, takeWhile } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export enum filterMode {
  mentor = 0,
  protege = 1
}

@Component({
  selector: 'lt-summary-mentors',
  templateUrl: './summary-mentors.component.html',
  styleUrls: ['./summary-mentors.component.scss']
})
export class SummaryMentorsComponent implements OnInit, OnDestroy {
  filterMode = filterMode.mentor;
  filterModes = filterMode;
  isLoad: boolean;
  isAdmin = false;
  componentActive = true;
  mentorshipList: User[];
  currentUser$: Observable<User>;
  objectValues = Object.values;
  gotMentorList: User[];
  control = new FormControl(filterMode.mentor);
  searchString = null;
  constructor(
    private dialogService: DialogService,
    private store: Store<any>
  ) {
  }


  ngOnInit() {
    // subscribe for know is mentors is loaded or not
    this.getStatusLoaded();
    // selected mentors
    this.getMentors();

    this.controlValueChanges();
  }

  getMentors(): void {
    this.store.select(selectMentors)
      .pipe(
        filter((items: any) => (items && items.length)),
        takeWhile(() => this.componentActive),
        map((items: User[]) => {
          // filter for clear from mentor that doesn't have protege
          return items.filter(item => Object.values(item.attributes.proteges).length);
        })
      )
      .subscribe((res: User[]) => {
        this.mentorshipList =  this.gotMentorList = res;
      });
    this.store.dispatch(new LoadMentors());
  }

  getStatusLoaded(): void {
    this.store.select(selectMentorsLoad)
      .pipe(
        takeWhile(() => this.componentActive)
      )
      .subscribe((res: boolean) => {
        this.isLoad = res;
      });
  }

  controlValueChanges(): void {
    this.control.valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(value => {
        this.filterMode = value;
        this.onFilter(this.searchString);
      });
  }


  onFilter(search: string | null): void {

    if (search) {
      this.searchString = search;
      this.mentorshipList = this.gotMentorList.filter((item: User) => {
        const text = search.toLocaleLowerCase();
        const data = item.attributes;
        return  this.checkModeFiltration()
          ? this.comparisonName(data, text)
          : this.checkProtegeName(data.proteges, text);
      });
      return;
    }
    this.searchString = null;
    this.mentorshipList = this.gotMentorList;
  }

  checkModeFiltration(): boolean {
    return this.filterMode === this.filterModes.mentor;
  }

  checkProtegeName(proteges: UsersMap, text): boolean {
    return Object.values(proteges).some((item) => {
      return this.comparisonName(item.attributes, text);
    });
  }

  comparisonName(data, text: string): boolean {
    return data.fullName.toLocaleLowerCase().includes(text);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
