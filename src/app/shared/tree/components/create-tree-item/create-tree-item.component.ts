import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
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
    this.checkValidators();
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

  /**
   * will call after creating control
   */
  private listenChanges(): void {

    this.control.valueChanges.subscribe((value) => {
      if ((this.control.valid && this.control.value !== null) && value.length) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    });
  }

  private checkValidators() {
    if (this.validators) {
      this.setValidators(this.validators);
    }
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

  private setValidators(validators) {
    const tempValidators = [];

    for (const validator in validators) {

      if (validators.hasOwnProperty(validator)) {
        switch (validator) {
          case 'required':
            tempValidators.push(Validators.required);
            break;
          default:
            if (typeof Validators[validator] === 'function') {
              tempValidators.push(Validators[validator](validators[validator]));
            } else if (typeof LtValidators[validator] === 'function') {
              tempValidators.push(LtValidators[validator]);
            }
            break;
        }
      }
    }

    this.control.setValidators(tempValidators);
  }

}
