import {AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import Typed from 'typed.js';
import {GeneralService} from './services/general.service';
import {Quote} from './models/Quote';
import {Scroll} from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  toggle: boolean;
  quotes: Quote[];
  quote: string;
  author: string;
  option: string;
  @ViewChild('sideMenu') sideMenuRef: ElementRef;
  @ViewChild('home') homeSectionRef: ElementRef;
  @ViewChild('about') aboutSectionRef: ElementRef;
  @ViewChild('skills') skillsSectionRef: ElementRef;
  @ViewChild('resume') resumeSectionRef: ElementRef;

  currentActive = 'home';
  homeOffset: number = null;
  aboutOffset: number = null;
  skillsOffset: number = null;
  resumeOffset: number = null;

  constructor(private generalService: GeneralService,
              @Inject(DOCUMENT) private document: any) { }

  ngAfterViewInit(): void {
    this.homeOffset = this.homeSectionRef.nativeElement.offsetTop;
    this.aboutOffset = this.aboutSectionRef.nativeElement.offsetTop;
    this.skillsOffset = this.skillsSectionRef.nativeElement.offsetTop;
    this.resumeOffset = this.resumeSectionRef.nativeElement.offsetTop;
  }

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

  isActive(option: string): string {
    return (this.currentActive === option) ? 'active' : '';
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.isWithinRange(window.pageYOffset, this.homeOffset, this.aboutOffset)) {
      this.currentActive = 'home';
    } else if (this.isWithinRange(window.pageYOffset, this.aboutOffset, this.resumeOffset)) {
      this.currentActive = 'about';
    } else if (window.pageYOffset >= this.resumeOffset) {
      this.currentActive = 'resume';
    }
  }

  isWithinRange(value: number, minValue: number, maxValue: number): boolean {
    return value >= minValue && value <= maxValue;
  }
}
