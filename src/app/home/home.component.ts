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
  currentResource:string;
  currentType:string = 'video'; //default
  resourceLibrary:any = [];
  selectedVideo:string;
  changeVideo(e) {
    this.currentResource = e.target.value;
    this.currentType = e.target.dataType;
    console.log('e.target = ', e.target);
    console.log('currentType = ', this.currentType)
    console.log('currentResource = ', this.currentResource);
  }

  autoChangeVideo() {
    console.log('autoChangeVideo fired');
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
        this.currentResource = this.resourceLibrary[0].resources[0].src; // default video
        console.log('currentResource = ', this.currentResource);
      })
    // console log data
    this.dataService
      .fetchResourceLibrary()
      .subscribe(
        (data) => console.log(data)
      )
  } // /ngOnInit()

}
