import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Tweet } from '../models/dto';
import { TweetStreamApiService } from '../service/tweet-stream-api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  constructor(
    public tweetService: TweetStreamApiService
  ) { }

  pageEvent = (event: PageEvent) => {
    this.tweetService.getHistory(event.pageIndex)
      .subscribe(
        res => {
          this.tweetService.historyLength = res.totalElements;
          this.tweetService.historyTweets = res.content.map(v => JSON.parse(v.data));
        });
  }

}
