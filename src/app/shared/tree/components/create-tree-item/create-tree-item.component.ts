import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ItemNode} from '../../models/item-node.model';
import {LtValidators} from '../../../helpers/validator-methods.static';

@Component({
  selector: 'lt-create-tree-item',
  templateUrl: './create-tree-item.component.html',
  styleUrls: ['./create-tree-item.component.scss']
})
export class CreateTreeItemComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() validators: any;
  @Input() main = false;
  @Input() value: string;

  @Output() createItem = new EventEmitter<string>();
  @Output() removeItem = new EventEmitter<string>();

  public isDisabled = true;
  public control: FormControl;
  public item: ItemNode;
  public controlValue: any;

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
    if (event.key === 'Enter' && !this.isDisabled) {
      this.saveTask();
    }
    if (event.key === 'Escape') {
      this.deleteTask();
    }
  }

  public setValue() {
    this.checkedValue(this.item);
  }

  public checkedValue(task) {
    if (!task || !task.text) {
      this.isDisabled = true;
    } else {
      this.patchValue(task.text);
      this.controlValue = this.control.value;
    }
  }

  public patchValue(value): void {
    this.control.patchValue(value);
  }

  public noWhitespaceValidator(control: AbstractControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ?  null : {whitespace: 'value is only whitespace'} ;
  }

  /**
   * will call after creating control
   */
  private listenChanges(): void {
    this.control.valueChanges.subscribe((value) => {
      if (value && value.length > 0 && this.noWhitespaceValidator(this.control)) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    });
  }

  public saveTask() {
    if (!this.control.value || this.control.invalid) {
      return;
    }
    this.createItem.emit(this.control.value);
    this.control.markAsUntouched({onlySelf: true});
    this.control.reset();
    this.isDisabled = true;
  }

  public deleteTask() {
    this.removeItem.emit();
    this.control.markAsUntouched({onlySelf: true});
    this.control.reset();
    this.isDisabled = true;
  }

}
