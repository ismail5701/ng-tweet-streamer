import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Tweet } from '../models/dto';
import { TweetStreamApiService } from '../service/tweet-stream-api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  tweets: Tweet[];
  length = 0;

  constructor(
    private tweetService: TweetStreamApiService
  ) { }

  ngOnInit(): void {
    this.tweetService.getHistory(0)
      .subscribe(
        res => {
          this.length = res.totalElements;
          this.tweets = res.content.map(v => JSON.parse(v.data));
        });
  }

  pageEvent = (event: PageEvent) => {
    this.tweetService.getHistory(event.pageIndex)
      .subscribe(
        res => {
          this.length = res.totalElements;
          this.tweets = res.content.map(v => JSON.parse(v.data));
        });
  }

}
