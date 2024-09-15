import { Component, OnInit } from '@angular/core';
import { LocalesService } from '../../core/services/locales.service';

@Component({
  selector: 'app-theme-language',
  standalone: true,
  imports: [],
  templateUrl: './theme-language.component.html',
  styleUrl: './theme-language.component.css'
})
export class ThemeLanguageComponent implements OnInit {

  locales: string[] = [];
  locale: string|undefined;
  userid: number|undefined;

  constructor(
    private Locales: LocalesService
  ){}

  ngOnInit(){
    this.Locales.getLocales().subscribe(
      response => {
       this.locales = response.locales
      }
    );

    if (this.userid) {
      this.Locales.getLocaleById(1).subscribe((response) => this.locale = response);
    }
  }

  onSelected(locale:string):void {}

}
