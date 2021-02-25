import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent implements OnInit {
  @Input() selectedOption;
  @Input() options;
  @Input() placeholder;
  @Input() style: "default" | "outline" = "default";
  constructor() {}

  ngOnInit(): void {}
}
