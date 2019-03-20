import {NgModule} from '@angular/core';
import {TreeComponent} from './tree.component';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatTreeModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {CreateTreeItemComponent} from './components/create-tree-item/create-tree-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from '../dialog/dialog.module';

@NgModule({
  declarations: [TreeComponent, CreateTreeItemComponent],
  exports: [TreeComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTreeModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    DialogModule
  ]
})
export class TreeModule {
}
