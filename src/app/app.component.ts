import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Typed from 'typed.js';
import {GeneralService} from './services/general.service';
import {Quote} from './models/Quote';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  toggle: boolean;
  quotes: Quote[];
  quote: string;
  author: string;
  @ViewChild('sideMenu') sideMenuRef: ElementRef;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.toggle = false;
    const typed = new Typed('#typed', {
      strings: ['a Developer', 'a Learner', 'an Anime Lover'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    });

    this.getGeneratedQuote();
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

  getGeneratedQuote(): void {
    this.generalService.getRandomQuote().subscribe(quotes => {
        const index = Math.round(Math.random() * 1643);
        this.quote = quotes[index].text;
        this.author = (quotes[index].author !== null) ? quotes[index].author : 'Anonymous';
      }
    );
  }
}
