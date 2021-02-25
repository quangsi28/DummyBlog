import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.scss'],
})
export class DropdownOptionComponent implements OnInit {
  @Output() selectOption = new EventEmitter<any>();
  @Input() selected: boolean;
  @Input() value: any;

  constructor() {}

  ngOnInit(): void {}

  onSelectOption(value) {
    this.selectOption.emit({ value });
  }
}
