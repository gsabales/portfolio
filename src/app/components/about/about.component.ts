import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from '../../services/general.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  quote: string;
  author: string;
  @Input() workYears;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getGeneratedQuote();
  }

  getGeneratedQuote(): void {
    this.generalService.getRandomQuote().subscribe(quotes => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        this.quote = randomQuote.text;
        this.author = !!randomQuote.author ? randomQuote.author : 'Anonymous';
      }
    );
  }

}
