import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DataService]
})
export class HomeComponent implements OnInit {
  currentCategory:string;
  currentVideo:string;
  resourceLibrary:any = [];
  selectedVideo:string;
  changeVideo(e) {
    this.currentVideo = e.target.value;
    console.log(this.currentVideo);
  }

  constructor(private dataService: DataService, private http: HttpClient, public sanitizer: DomSanitizer) { }


  ngOnInit() {
    this.dataService
      .fetchresourceLibrary()
      .map(data => data)
      .subscribe(resourceLibrary => {
        this.resourceLibrary = resourceLibrary;
        this.currentVideo = this.resourceLibrary[0].videos[0].src;
        console.log('currentVideo = ', this.currentVideo);
      })
    // console log data
    this.dataService
      .fetchresourceLibrary()
      .subscribe(
        (data) => console.log(data)
      )

  } // /ngOnInit()

}
