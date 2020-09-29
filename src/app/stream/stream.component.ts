import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  tweets: string[] = ['','','','','','','','','','','','','','','','','','']

  constructor() { }

  ngOnInit(): void {
  }

}
