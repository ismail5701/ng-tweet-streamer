import { Component, OnInit } from '@angular/core';
import { TweetStreamApiService } from '../service/tweet-stream-api.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
})
export class StreamComponent {

  constructor(public tweetService: TweetStreamApiService) { }

}
