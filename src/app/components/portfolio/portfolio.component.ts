import { Component, OnInit } from '@angular/core';
import {ProjectsModalComponent} from '../../modals/projects-modal/projects-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../../models/Project';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  projectForge: Project;
  projectOccupy: Project;
  healthNow: Project;
  bdoCMS: Project;
  bdoPMR: Project;

  constructor(private modalService: NgbModal) {
    this.projectForge = new Project(
      'Project Forge',
      'AWS Instance Ticketing System',
      'Forge Praxis is a web portal and AWS instance ticketing system for the client’s developers. ' +
      'As a newbie developer, I was assigned to create the FAQ page of the web app, develop the email-sending ' +
      'mechanism for created AWS instances, and develop the content management system of the whole web application.',
      'assets/images/forge-img.png'
    );
    this.projectOccupy = new Project(
      'Project Occupy',
      'Desk Reservation System',
      'Project Occupy is a desk reservation system created for Novare as an internal project. As a developer, ' +
      'I am responsible for creating the skeleton UI as well as the desk reservation mechanism of the system. This where ' +
      'I honed my Angular skills since this project is UI/UX intensive.',
      'assets/images/occupy-img.png'
    );
    this.healthNow = new Project(
      'KMD API Integration',
      'KonsultaMD API integration',
      'In this project, we were assigned as an extension team in which our objective is to integrate HealthNow and ' +
      'other third-party applications in the future with KonsultaMD’s video conference services. This is where I learned fundamental' +
      ' API concepts such as OAuth2, JWT and FeignClient.',
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

  ngOnInit(): void {
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
