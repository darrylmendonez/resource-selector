import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DataService]
})
export class HomeComponent implements OnInit {
  currentCategory:string;
  currentVideo:string;
  currentImg:string;
  videoLibrary:any = [];
  selectedVideo:string;
  changeVideo(e) {
    this.selectedVideo = e.target.value;
    this.currentImg = this.selectedVideo;
    console.log(this.currentImg);
  }
  trackByFn(index, item) {
    return item.id;
  }


  constructor(private dataService: DataService, private http: HttpClient) { }


  ngOnInit() {
    this.dataService
      .fetchVideoLibrary()
      .map(data => data)
      .subscribe(videoLibrary => {
        this.videoLibrary = videoLibrary;
        this.currentImg = this.videoLibrary[0].videos[0].img;
      })
    // console log data
    this.dataService
      .fetchVideoLibrary()
      .subscribe(
        (data) => console.log(data)
      )

  } // /ngOnInit()

}
