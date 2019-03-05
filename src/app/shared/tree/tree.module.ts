import { NgModule } from '@angular/core';
import { TreeComponent } from './tree.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTreeModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { CreateTreeItemComponent } from './components/create-tree-item/create-tree-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ TreeComponent, CreateTreeItemComponent ],
  exports: [ TreeComponent ],
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
  ]
})
export class TreeModule {
}
