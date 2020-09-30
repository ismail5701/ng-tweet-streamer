import { Component, OnInit } from '@angular/core';
import { TweetStreamApiService } from '../service/tweet-stream-api.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  constructor(public tweetService: TweetStreamApiService) { }

  ngOnInit(): void {
  }

}
