import {AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import Typed from 'typed.js';
import {GeneralService} from './services/general.service';
import {DOCUMENT} from '@angular/common';
import {ABOUT, CONTACT, HOME, PORTFOLIO, RESUME, SERVICES, TOGGLED} from './utils/constants';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as AOS from 'aos';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  toggle: boolean;
  option: string;

  @ViewChild('sideMenu') sideMenuRef: ElementRef;
  @ViewChild('home') homeSectionRef: ElementRef;
  @ViewChild('about') aboutSectionRef: ElementRef;
  @ViewChild('skills') skillsSectionRef: ElementRef;
  @ViewChild('resume') resumeSectionRef: ElementRef;
  @ViewChild('portfolio') portfolioSectionRef: ElementRef;
  @ViewChild('services') servicesSectionRef: ElementRef;
  @ViewChild('contact') contactSectionRef: ElementRef;
  @ViewChild('backToTop') backToTopRef: ElementRef;

  currentActive = 'home';
  currentYear: Date;
  workYears: number = null;
  homeOffset: number = null;
  aboutOffset: number = null;
  skillsOffset: number = null;
  resumeOffset: number = null;
  portfolioOffset: number = null;
  servicesOffset: number = null;
  contactOffset: number = null;

  emailStatus: boolean;
  emailStatusMessage: string = null;
  isLoading = false;
  emailFormGroup = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      subject: [null, [Validators.required, Validators.minLength(8)]],
      message: [null, Validators.required]
    }
  );

  constructor(private generalService: GeneralService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              @Inject(DOCUMENT) private document: any) { }

  ngAfterViewInit(): void {
    // Hide back-to-top button on page load
    this.backToTopRef.nativeElement.hidden = true;
    this.getOffsetTop();
  }

  ngOnInit(): void {
    // Initialize aos css library
    AOS.init();

    this.toggle = false;
    this.currentYear = new Date();
    const typed = new Typed('#typed', {
      strings: ['a Developer', 'a Learner', 'a Mobile Gamer'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    });

    this.getWorkExpYears();
  }

  getWorkExpYears(): void {
    const hiringDate = new Date('07/30/2019');
    const timeDiff = Math.abs(this.currentYear.getTime() - hiringDate.getTime());
    const yearDiff = (timeDiff / (1000 * 3600 * 24)) / 365;
    this.workYears = Math.round(yearDiff * 100) / 100;
  }

  getOffsetTop(): void {
    this.homeOffset = this.homeSectionRef.nativeElement.offsetTop;
    this.aboutOffset = this.aboutSectionRef.nativeElement.offsetTop;
    this.skillsOffset = this.skillsSectionRef.nativeElement.offsetTop;
    this.resumeOffset = this.resumeSectionRef.nativeElement.offsetTop;
    this.portfolioOffset = this.portfolioSectionRef.nativeElement.offsetTop;
    this.servicesOffset = this.servicesSectionRef.nativeElement.offsetTop;
    this.contactOffset = this.contactSectionRef.nativeElement.offsetTop;
  }

  toggleSideMenu(): void {
    this.toggle = !this.toggle;
    const sideMenuClassList = this.sideMenuRef.nativeElement.classList;

    /* Toggle side bar by adding .toggled class which sets margin to 0. By default, left margin is -20rem. */
    (sideMenuClassList.contains(TOGGLED)) ? sideMenuClassList.remove(TOGGLED) : sideMenuClassList.add(TOGGLED);
  }

  toggleMenuIfClicked(): void {
    /* If window width is less than 1200px, sidebar should be collapsable upon clicking menu items*/
    if (window.innerWidth < 1200) {
      this.toggleSideMenu();
    }
  }

  collapseMenu(): void {
    const sideMenuClassList = this.sideMenuRef.nativeElement.classList;
    if (window.innerWidth < 1200 && sideMenuClassList.contains(TOGGLED)) {
      sideMenuClassList.remove(TOGGLED);
      this.toggle = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {

    // For debugging purposes
    // this.logYOffsets();

    if (this.isWithinRange(window.pageYOffset, this.homeOffset, this.aboutOffset)) {
      this.currentActive = HOME;
    } else if (this.isWithinRange(window.pageYOffset, this.aboutOffset, this.resumeOffset)) {
      this.currentActive = ABOUT;
    } else if (this.isWithinRange(window.pageYOffset, this.resumeOffset, this.portfolioOffset)) {
      this.currentActive = RESUME;
    } else if (this.isWithinRange(window.pageYOffset, this.portfolioOffset, this.servicesOffset)) {
      this.currentActive = PORTFOLIO;
    } else if (this.isWithinRange(window.pageYOffset, this.servicesOffset, this.contactOffset)) {
      this.currentActive = SERVICES;
    } else if (window.pageYOffset >= this.contactOffset) {
      this.currentActive = CONTACT;
    }

    // Toggle back-to-top button display on scroll. On first scroll, un-hide the button already to apply animations.
    if (window.pageYOffset > 50) {
      this.backToTopRef.nativeElement.hidden = false;
      this.backToTopRef.nativeElement.classList.add('display-button');
    } else {
      this.backToTopRef.nativeElement.classList.remove('display-button');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    /* Get offsetTop of each section dynamically upon resize to match mobile and desktop active items*/
    this.getOffsetTop();
  }

  isWithinRange(value: number, minValue: number, maxValue: number): boolean {
    return value >= minValue && value < maxValue;
  }

  // validateFormControl(fcName: string): boolean {
  //   return this.emailFormGroup.get(fcName).invalid && (this.emailFormGroup.get(fcName).dirty || this.emailFormGroup.get(fcName).touched);
  // }
  //
  // sendEmail(): void {
  //   this.isLoading = true;
  //   // const email = new Email(
  //   //   this.emailFormGroup.get('name').value,
  //   //   this.emailFormGroup.get('email').value,
  //   //   this.emailFormGroup.get('subject').value,
  //   //   this.emailFormGroup.get('message').value,
  //   // );
  //
  //   // Via SmtpJS
  //   Email.send({
  //     Host: environment.host,
  //     Username: environment.username,
  //     Password: environment.elastic_mail_password,
  //     To: environment.username,
  //     From: environment.username,
  //     Subject: this.emailFormGroup.get('subject').value,
  //     Body: `
  //           <b>Name: </b>${this.emailFormGroup.get('name').value} <br/>
  //           <b>Email: </b>${this.emailFormGroup.get('email').value}<br />
  //           <b>Subject: </b>${this.emailFormGroup.get('subject').value}<br />
  //           <b>Message:</b> <br /> ${this.emailFormGroup.get('message').value} <br><br>
  //           <i>This is sent as a feedback from my portfolio website</i><br/><br/>
  //           <b>~End of Message.~</b>`
  //   }).then(() => {
  //     this.isLoading = false;
  //     this.emailFormGroup.reset();
  //     this.emailStatusMessage = 'Your email has been sent. Thank you for your feedback!';
  //     setTimeout(() => this.emailStatusMessage = null, 2500);
  //   });
  // }

  // For debugging purposes
  logYOffsets(): void {
    console.log('windowOffset: ' + window.pageYOffset);
    console.log('homeOffset: ' + this.homeOffset);
    console.log('aboutOffset: ' + this.aboutOffset);
    console.log('resumeOffset: ' + this.resumeOffset);
    console.log('portfolioOffset: ' + this.portfolioOffset);
    console.log('servicesOffset: ' + this.servicesOffset);
    console.log('contactOffset: ' + this.contactOffset);
  }

}
