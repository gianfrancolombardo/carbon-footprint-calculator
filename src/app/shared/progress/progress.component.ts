import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  @Input()
  footprint_subject: any
  @Input()
  footprint: any
  bar = {
    main:100,
    min:0,
    max:0
  }
  

  constructor() { }

  ngOnInit(): void {
    this.footprint_subject.subscribe((data: any) => {
      this.bar.main = ((data.new * 100)/data.total)
      this.bar.max = (Math.abs(data.max - data.new) * 100)/data.total
      this.bar.min = 0
      console.log(this.bar)
   });
  }

}
