import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddResponse, AddRequest, TweetHistoryDto, Tweet, TweetEntity } from '../models/dto';
import { interval, Observable } from 'rxjs';
import { map, retry, share, startWith, switchMap } from 'rxjs/operators';
import { Queue } from '../models/Queue';
@Injectable({
  providedIn: 'root'
})
export class TweetStreamApiService {

  uri = 'http://localhost:8080';

  liveTweets = new Queue<Tweet>(20);
  count = 0;

  constructor(private http: HttpClient) {
    interval(1000)
      .pipe(
        startWith(0),
        switchMap(() => this.stream()),
        retry(),
        share()
      )
      .subscribe(res => {
        console.log(`seconds - streaming`);
        if (this.liveTweets.isEmpty()) {
          this.liveTweets.enqueue(res);
        } else {
          const foundTweet = this.liveTweets.queue.find(x => x.id === res.id);
          if (!foundTweet) {
            this.liveTweets.enqueue(res);
          }
        }
      });
  }

  deleteRules = (): Observable<any> => this.http.delete<any>(this.uri + '/rules');

  addRules = (payload: AddRequest): Observable<AddResponse> => this.http.post<AddResponse>(this.uri + '/rules', payload);

  getHistory = (page: number): Observable<TweetHistoryDto> => this.http.get<TweetHistoryDto>(this.uri + `/history?page=${page}`);

  stream = (): Observable<Tweet> => {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return this.http.get<TweetEntity>(this.uri + '/live', { headers })
      .pipe(
        map(v => new Tweet(v))
      );
  }

}
