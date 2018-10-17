import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-what-is',
  templateUrl: './what-is.component.html',
  styleUrls: ['./what-is.component.css']
})
export class WhatIsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goTo(where) {
    let windowRef = window;
    switch (where) {
      case 'download-ios':
        windowRef.open("https://itunes.apple.com/us/app/plac/id1220217354", "_blank");
        break;
      case 'download-android':
        windowRef.open("https://play.google.com/store/apps/details?id=com.placapp", "_blank");
        break;
    }
  }

}
