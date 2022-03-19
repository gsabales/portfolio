import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsModalComponent } from './modals/projects-modal/projects-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ResumeComponent } from './components/resume/resume.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsModalComponent,
    AboutComponent,
    SkillsComponent,
    ResumeComponent,
    PortfolioComponent,
    ServicesComponent,
    ContactComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      NgbModule,
      ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
