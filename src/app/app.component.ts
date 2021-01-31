import {Component, OnInit} from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'portfolio';

  ngOnInit(): void {
    const typed = new Typed('#typed', {
      strings: ['a Developer', 'a Learner', 'an Anime Lover'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    });
  }
}
