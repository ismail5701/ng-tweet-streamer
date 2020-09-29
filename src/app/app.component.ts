import { Component } from '@angular/core';
import { TweetStreamApiService } from './service/tweet-stream-api.service';
import { Add } from './models/dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-tweet-streamer';
  followerList: string[] = [];
  trackList: string[] = [];
  follower = '';
  track = '';

  constructor(
    private tweetService: TweetStreamApiService
  ) { }

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
      res => console.log(res)// TODO
    );

  }

  clear = () => {
    this.tweetService.deleteRules();
    this.followerList = [];
    this.trackList = [];
  }

}
