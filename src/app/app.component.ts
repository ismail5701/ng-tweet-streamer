import { Component } from '@angular/core';

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
  
  addFollower() {
    if (this.follower === '') {
      return;
    }
    this.followerList.push(this.follower);
    this.follower = '';
  }

  addTrack() {
    if (this.track === '') {
      return;
    }
    this.trackList.push(this.track);
    this.track = '';
  }

  reset() {
    console.log('call api');    
  }

  clear() {
    
  }
}
