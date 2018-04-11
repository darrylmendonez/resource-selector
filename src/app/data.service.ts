import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  constructor(private http: Http) {}

  fetchVideoLibrary() {
    return this.http.get('./assets/data/videoLibrary.json').map(res => res.json());
  }

}
