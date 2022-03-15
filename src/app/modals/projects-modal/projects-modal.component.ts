import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projects-modal',
  templateUrl: './projects-modal.component.html',
  styleUrls: ['./projects-modal.component.scss']
})
export class ProjectsModalComponent implements OnInit {
  @Input() name;
  @Input() description;
  @Input() content;
  @Input() imageUrl;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
