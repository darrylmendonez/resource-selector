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
  currentType:string;
  resourceLibrary:any = [];
  selectedVideo:string;
  changeVideo(e) {
    this.currentVideo = e.target.value;
    this.currentType = e.target.dataType;
    console.log('e.target = ', e.target);
    console.log('currentType = ', this.currentType)
    console.log('currentVideo = ', this.currentVideo);
  }

  constructor(private dataService: DataService,
    private http: HttpClient,
    public sanitizer: DomSanitizer) { }


  ngOnInit() {
    this.dataService
      .fetchResourceLibrary()
      .map(data => data)
      .subscribe(resourceLibrary => {
        this.resourceLibrary = resourceLibrary;
        this.currentVideo = this.resourceLibrary[0].resources[0].src;
        console.log('currentVideo = ', this.currentVideo);
      })
    // console log data
    this.dataService
      .fetchResourceLibrary()
      .subscribe(
        (data) => console.log(data)
      )

  } // /ngOnInit()

}
