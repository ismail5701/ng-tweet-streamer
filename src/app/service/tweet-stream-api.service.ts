import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddResponse, AddRequest, TweetHistoryDto, Tweet, TweetEntity } from '../models/dto';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TweetStreamApiService {

  uri = environment.endpoint;

  liveTweets: Tweet[] = [];
  historyTweets: Tweet[];
  historyLength = 0;
  count = 0;

  constructor(private http: HttpClient) {
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
