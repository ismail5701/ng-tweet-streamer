import { Component, OnInit } from '@angular/core';
import { TweetStreamApiService } from './service/tweet-stream-api.service';
import { Add } from './models/dto';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    this.tweetService.stream()
    .subscribe(
      pipe(
        tap(v=>console.log(v))
      ));
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
    this.tweetService.deleteRules();
    this.followerList = [];
    this.trackList = [];
  }

}
