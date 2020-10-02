import { Component, OnInit } from '@angular/core';
import { TweetStreamApiService } from './service/tweet-stream-api.service';
import { Add, Tweet } from './models/dto';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { interval } from 'rxjs';
import { retry, share, startWith, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private tweetService: TweetStreamApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.clear();
    this.snackBar.open('All Existing Rules Cleared!', null, {
      duration: 3000,
    });
    interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.tweetService.stream()),
        retry(),
        share()
      )
      .subscribe(res => {
        console.log(`seconds - streaming`);
        this.tweetService.liveTweets = res.map(v => new Tweet(v));
      });
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
      this.snackBar.open('Please Add Follower or Track!', null, {
        duration: 3000,
      });
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
      res => {
        console.log(res);// TODO error handle
        this.snackBar.open('Rules updated', null, {
          duration: 3000,
        });
      }
    );

  }

  clear = () => {
    this.tweetService.deleteRules().subscribe(
      res => {
        console.log(res);
        this.snackBar.open('Rules Cleared', null, {
          duration: 3000,
        });
      }
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
