import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LtValidators } from '../../helpers/validator-methods.static';
import { debounceTime, distinctUntilChanged, map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'lt-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() validators: any;
  @Input() value: string;

  @Output() search = new EventEmitter<string>();

  public isDisabled = true;
  public control: FormControl;
  public controlValue: any;
  private componentActive = true;
  constructor() {
  }

  public createControl() {
    this.control = new FormControl(null);
    this.listenChanges();
    this.setValue();
  }

  ngOnInit() {
    this.createControl();
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.clearSearch();
    }
  }

  public setValue() {
    this.checkedValue(this.value);
  }

  public checkedValue(value) {
    if (!value) {
      this.isDisabled = true;
    } else {
      this.patchValue(value);
      this.controlValue = this.control.value;
    }
  }

  public patchValue(value): void {
    this.control.patchValue(value);
  }

  /**
   * will call after creating control
   */
  private listenChanges(): void {
    this.control.valueChanges
      .pipe(
        takeWhile(() => this.componentActive),
        debounceTime(500),
        distinctUntilChanged(),
        map((value: string) => value && value.trim() ? value.trim() : null)
      )
      .subscribe((value) => {
        this.activatedButton(value);
        this.search.emit(value);
    });
  }

  public clearSearch() {
    this.control.markAsUntouched({onlySelf: true});
    this.control.reset();
    this.isDisabled = true;
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  private activatedButton(value) {
    if (value && value.length > 0 && !LtValidators.noWhitespaceValidator(this.control)) {
      this.isDisabled = false;
      return;
    }
      this.isDisabled = true;
  }

}
