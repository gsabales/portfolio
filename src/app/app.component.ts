import {AfterViewInit, Component, ElementRef, Host, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import Typed from 'typed.js';
import {GeneralService} from './services/general.service';
import {Quote} from './models/Quote';
import {DOCUMENT} from '@angular/common';
import {HOME, ABOUT, RESUME, TOGGLED, PORTFOLIO, SERVICES, CONTACT} from './utils/constants';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProjectsModalComponent} from './modals/projects-modal/projects-modal.component';
import {Project} from './models/Project';
import * as AOS from 'aos';
import {FormBuilder, Validators} from '@angular/forms';

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
  projectForge: Project;
  projectOccupy: Project;
  healthNow: Project;
  bdoCMS: Project;
  bdoPMR: Project;

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
  homeOffset: number = null;
  aboutOffset: number = null;
  skillsOffset: number = null;
  resumeOffset: number = null;
  portfolioOffset: number = null;
  servicesOffset: number = null;
  contactOffset: number = null;
  currentYear = new Date().getFullYear();

  constructor(private generalService: GeneralService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              @Inject(DOCUMENT) private document: any) {
    this.projectForge = new Project(
      'Project Forge',
      'AWS Instance Ticketing System',
      'An AWS instance ticketing system for a large telecommunications company. ' +
      'This is my first project as a developer where I learned most the fundamentals of web development and microservices.',
      'assets/images/forge-img.png'
      );
    this.projectOccupy = new Project(
      'Project Occupy',
      'Desk Reservation System',
      'An internal desk reservation system project built in Angular and Springboot. This is where I practiced my front-end ' +
      'development skills since this application is UI/UX intensive.',
      'assets/images/occupy-img.png'
    );
    this.healthNow = new Project(
      'HealthNow + KMD Integration',
      'KonsultaMD API integration with HealthNow',
      'Enabled HealthNow to access the video conference services of KonsultaMD through API integration. This is where ' +
      'I learned API communication concepts such as OAuth2, JWT and FeignClient.',
      'assets/images/kmd-stock-photo.png'
    );
    this.bdoCMS = new Project(
      'BDO CMS',
      'BDO Cash Management System',
      'BDO Cash Management System (CMS) is a standalone API catered for corporate data of BDO Southbound APIs. This API accepts' +
      ' aggregated requests and communicates with BDO’s core banking system. As the main developer of this API, I implemented multithreading ' +
      'via Java’s concurrency library to optimize the API’s performance.',
      'assets/images/cms-stock-photo.jpg'
    );
    this.bdoPMR = new Project(
      'BDO PMR',
      'BDO Prepaid Mobile Reload ',
      'BDO Prepaid Mobile Reload (PMR) is also a standalone API which acts as an intermediary microservice between ' +
      'BDO’s Airtime Reload (ATR) system and Paymaya API. As the main developer, my objective is to create a passthrough API ' +
      'that facilitates the flow of reload transactions between BDO and Paymaya. This is where I extensively used Docker ' +
      'for containerization and got familiar with deployment processes.',
      'assets/images/pmr-stock-photo.jpg'
    );
  }

  ngAfterViewInit(): void {
    // Hide back-to-top button on page load
    this.backToTopRef.nativeElement.hidden = true;

    this.getOffsetTop();
  }

  ngOnInit(): void {
    // Initialize aos css library
    AOS.init();

    this.toggle = false;
    const typed = new Typed('#typed', {
      strings: ['a Developer', 'a Learner', 'a Mobile Gamer'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    });

    this.getGeneratedQuote();
  }

  getGeneratedQuote(): void {
    this.generalService.getRandomQuote().subscribe(quote => {
      this.quote = quote.quote;
      this.author = (quote.author !== null) ? quote.author : 'Anonymous';
      }
    );
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

  openModal(name: string): void {
    const modalRef = this.modalService.open(ProjectsModalComponent, {centered: true});
    if (name === 'Forge') {
      modalRef.componentInstance.name = this.projectForge.name;
      modalRef.componentInstance.description =  this.projectForge.description;
      modalRef.componentInstance.content = this.projectForge.content;
      modalRef.componentInstance.imageUrl = this.projectForge.imageUrl;
    } else if (name === 'Occupy') {
      modalRef.componentInstance.name = this.projectOccupy.name;
      modalRef.componentInstance.description =  this.projectOccupy.description;
      modalRef.componentInstance.content = this.projectOccupy.content;
      modalRef.componentInstance.imageUrl = this.projectOccupy.imageUrl;
    } else if (name === 'HealthNow') {
      modalRef.componentInstance.name = this.healthNow.name;
      modalRef.componentInstance.description =  this.healthNow.description;
      modalRef.componentInstance.content = this.healthNow.content;
      modalRef.componentInstance.imageUrl = this.healthNow.imageUrl;
    } else if (name === 'CMS') {
      modalRef.componentInstance.name = this.bdoCMS.name;
      modalRef.componentInstance.description =  this.bdoCMS.description;
      modalRef.componentInstance.content = this.bdoCMS.content;
      modalRef.componentInstance.imageUrl = this.bdoCMS.imageUrl;
    } else if (name === 'PMR') {
      modalRef.componentInstance.name = this.bdoPMR.name;
      modalRef.componentInstance.description =  this.bdoPMR.description;
      modalRef.componentInstance.content = this.bdoPMR.content;
      modalRef.componentInstance.imageUrl = this.bdoPMR.imageUrl;
    }
  }
}
