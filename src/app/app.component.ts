import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import DataJson from '../assets/json/data.json'
import CountriesJson from '../assets/json/emitions_per_capita.json'
import EquivalentsJson from '../assets/json/equivalents.json'
import { fadeInUpOnEnterAnimation, fadeOutUpOnLeaveAnimation, fadeInLeftOnEnterAnimation, fadeOutRightOnLeaveAnimation } from 'angular-animations';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AnswersService } from './services/answers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeInUpOnEnterAnimation({ duration: 300, translate: '50px', delay: 100 }),
    fadeOutUpOnLeaveAnimation({ duration: 300, translate: '20px' }),
    fadeInLeftOnEnterAnimation({ duration: 100, translate: '50px' }),
    fadeOutRightOnLeaveAnimation({ duration: 100, translate: '50px' }),
    trigger('ShowDataAnimation', [
      transition('void => *', [
        animate('800ms', keyframes([
          style({ opacity: 0, 'margin-top': 0 }),
          style({ opacity: 1, 'margin-top': '-20px' }),
          style({ opacity: 0, 'margin-top': '-40px' })
        ]))
      ])
    ])
  ]
})


export class AppComponent {
  current_step = 0
  steps = DataJson
  countries = CountriesJson
  equivalents = EquivalentsJson
  footprint = {
    total: 0,
    new: 0,
    min: 0,
    max: 0,
    diff: 0,
    diff_per: 0
  }
  actions = 0
  footprint_subject = new Subject<any>();
  next_enable = false
  selected_option = 0
  answers = new Map()



  constructor(private answersService: AnswersService) {
    //console.log(DataJson)
    /*this.answersService.save_answers({"name":"gian"}).then(() => {
      console.log('Documento creado exitósamente!');
    }, (error: any) => {
      console.error(error);
    });*/
    this.answersService.anonymous_login();
  }

  set_country($event: any) {
    this.footprint.total = this.footprint.new = parseFloat($event.target.value);

    let text = $event.target.options[$event.target.options.selectedIndex].text;
    this.answersService.save_country(
      { name: text, value: this.footprint.total }
    )
  }

  start() {
    this.current_step = 1
  }

  next() {
    if (this.next_enable) {
      this.current_step++
      this.next_enable = false;
    }

    this.answersService.save_answers([...this.answers.values()], this.footprint)
  }

  prev() {
    this.answers.delete(this.current_step)
    this.current_step--
    this.answers.delete(this.current_step)
    this.next_enable = false;
    this.calculate_all();
  }

  is_finished() {
    //return true
    return this.current_step > DataJson.length
  }

  select_option(index: number, option: any) {
    console.log(option)
    this.next_enable = true;

    // Just for animation
    this.selected_option = index + option.value

    this.answers.set(index, option)
    this.calculate_all();
  }

  calculate_all() {
    let options = [...this.answers.values()]
    let value = options.reduce((acc, val) => acc + val.value, 0);
    let max = options.reduce((acc, val) => acc + val.max, 0);
    let min = options.reduce((acc, val) => acc + val.min, 0);
    this.footprint.new = this.footprint.total - value
    this.footprint.max = this.footprint.total - max
    this.footprint.min = this.footprint.total - min
    this.footprint.diff = this.footprint.total - this.footprint.new;
    this.footprint.diff_per = (this.footprint.diff * 100) / this.footprint.total

    this.footprint_subject.next(this.footprint)

    this.actions = options.filter(x => x.value != 0).length
    console.log(this.footprint)
  }

  get_level() {
    let percent = this.footprint.diff_per;
    if (percent <= 10)
      return 1
    else if (percent > 10 && percent <= 40)
      return 2
    else if (percent > 40 && percent <= 70)
      return 3
    else
      return 4
  }

  get_percent(value: any) {
    return (value * 100) / this.footprint.total;
  }

}
