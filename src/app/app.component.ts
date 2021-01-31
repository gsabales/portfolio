import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  toggle: boolean;
  @ViewChild('sideMenu') sideMenuRef: ElementRef;

  ngOnInit(): void {
    this.toggle = false;
    const typed = new Typed('#typed', {
      strings: ['a Developer', 'a Learner', 'an Anime Lover'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    });
  }

  isNavClicked(): void {
    this.toggle = !this.toggle;
    const sideMenuClassList = this.sideMenuRef.nativeElement.classList;

    if (sideMenuClassList.contains('toggled')) {
      sideMenuClassList.remove('toggled');
    } else {
      sideMenuClassList.add('toggled');
    }

  }
}
