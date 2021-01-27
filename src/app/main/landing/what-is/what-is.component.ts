import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-what-is",
  templateUrl: "./what-is.component.html",
  styleUrls: ["./what-is.component.css"],
})
export class WhatIsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  goTo(where) {
    let windowRef = window;
    switch (where) {
      case "download-ios":
        windowRef.open("", "_blank");
        break;
      case "download-android":
        windowRef.open("", "_blank");
        break;
    }
  }
}
