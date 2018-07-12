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
  currentId:number = 0;
  videoLibrary:any = [];
  selectedVideo:string;

  changeVideo(e) {
    this.currentId = e.target.value;
    this.currentVideo = this.videoLibrary[this.currentId].videoPath;
  }

  autoChangeVideo() {
    this.currentId = this.currentId + 1;
    if (this.currentId >= this.videoLibrary.length) {
      this.currentId = 0;
    }
    console.log('currentId = ', this.currentId);
    this.currentVideo = this.videoLibrary[this.currentId].videoPath;
  }

  constructor(private dataService: DataService,
    private http: HttpClient,
    public sanitizer: DomSanitizer) { }


  ngOnInit() {
    this.dataService
      .fetchvideoLibrary()
      .map(data => data)
      .subscribe(videoLibrary => {
        this.videoLibrary = videoLibrary;
        this.currentVideo = this.videoLibrary[0].videoPath; // default video
        console.log('currentVideo = ', this.currentVideo);
      })
    // console log data
    this.dataService
      .fetchvideoLibrary()
      .subscribe(
        (data) => console.log(data)
      )
  } // /ngOnInit()

}
