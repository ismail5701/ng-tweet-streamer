import { Component, OnInit } from '@angular/core';
import { TweetStreamApiService } from './service/tweet-stream-api.service';
import { Add } from './models/dto';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-tweet-streamer';
  followerList: string[] = [];
  trackList: string[] = [];
  follower = '';
  track = '';

  constructor(
    private tweetService: TweetStreamApiService
  ) { }

  ngOnInit(): void {
  }

  addFollower(): void {
    if (this.follower === '') {
      return;
    }
    this.followerList.push(this.follower);
    this.follower = '';
  }

  addTrack(): void {
    if (this.track === '') {
      return;
    }
    this.trackList.push(this.track);
    this.track = '';
  }

  reset = () => {
    if (this.followerList.length === 0 && this.trackList.length === 0) {
      return;
    }
    const add: Add[] = [];
    this.followerList.forEach(
      val => add.push({ tag: '', value: val })
    );
    this.trackList.forEach(
      val => add.push({ tag: '', value: val })
    );
    this.tweetService.addRules({ add }).subscribe(
      res => console.log(res)// TODO error handle
    );

  }

  clear = () => {
    this.tweetService.deleteRules().subscribe(
      res =>  console.log(res)
    );
    this.followerList = [];
    this.trackList = [];
  }

  tabChange(event: MatTabChangeEvent): void {
    if (event.index === 1) {
      this.tweetService.reloadHistory();
    }
  }
}
