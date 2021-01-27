import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-download-app",
  templateUrl: "./download-app.component.html",
  styleUrls: ["./download-app.component.css"],
})
export class DownloadAppComponent implements OnInit {
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
