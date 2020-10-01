import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddResponse, AddRequest, TweetHistoryDto, Tweet, TweetEntity } from '../models/dto';
import { interval, Observable } from 'rxjs';
import { retry, share, startWith, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TweetStreamApiService {

  uri = 'http://localhost:8080';

  liveTweets: Tweet[] = [];
  historyTweets: Tweet[];
  historyLength = 0;
  count = 0;

  constructor(private http: HttpClient) {
    interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.stream()),
        retry(),
        share()
      )
      .subscribe(res => {
        console.log(`seconds - streaming`);
        this.liveTweets = res.map(v => new Tweet(v));
      });
  }

  deleteRules = (): Observable<any> => this.http.delete<any>(this.uri + '/rules');

  addRules = (payload: AddRequest): Observable<AddResponse> => this.http.post<AddResponse>(this.uri + '/rules', payload);

  getHistory = (page: number): Observable<TweetHistoryDto> => this.http.get<TweetHistoryDto>(this.uri + `/history?page=${page}`);

  stream = (): Observable<TweetEntity[]> => {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return this.http.get<TweetEntity[]>(this.uri + '/live', { headers });
  }

  reloadHistory(): void {
    this.getHistory(0)
    .subscribe(
      res => {
        this.historyLength = res.totalElements;
        this.historyTweets = res.content.map(v => JSON.parse(v.data));
      });
  }

}
