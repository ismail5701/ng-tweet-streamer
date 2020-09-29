import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddResponse, AddRequest, TweetHistoryDto, Tweet } from '../models/dto';
import { Observable, timer } from 'rxjs';
import { retry, share, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TweetStreamApiService {

  uri = 'http://localhost:8080';

  liveTweets: Tweet[] = [];
  liveTweets$: Observable<Tweet>;

  constructor(private http: HttpClient) {
    // this.liveTweets$ = 
    // of({}).pipe(
    //   mergeMap(_ => this.stream),
    //   tap(v => console.log(v)),
    //   delay(1000),
    //   repeat()
    // );
    
    this.liveTweets$ = timer(1, 3000).pipe(
      switchMap(() => this.stream),
      retry(), 
      share()
 );
  }

  private toTweet = (json: string): Tweet => JSON.parse(json); 

  deleteRules = (): Observable<any> => this.http.delete<any>(this.uri + '/rules');

  addRules = (payload: AddRequest): Observable<AddResponse> => this.http.post<AddResponse>(this.uri + '/rules', payload);

  getHistory = (page: number): Observable<TweetHistoryDto> => this.http.get<TweetHistoryDto>(this.uri + '/history');

  stream = (): Observable<any> => this.http.get(this.uri + '/live');

}
