import { Component, OnInit } from '@angular/core';
import { Locale, SystemService, UsersService } from '../../generator';

@Component({
  selector: 'app-theme-language',
  standalone: true,
  imports: [],
  templateUrl: './theme-language.component.html',
  styleUrl: './theme-language.component.css',
})
export class ThemeLanguageComponent implements OnInit {
  locales: Locale[] = [];
  locale: string | undefined = 'EN';
  userid: number | undefined;

  constructor(private system: SystemService, private users: UsersService) {}

  ngOnInit() {
    this.system.systemGetLocales().subscribe((response) => {
      this.locales = response;
    });

    if (this.userid) {
      this.users
        .usersGetUser(this.userid)
        .subscribe((response) => (this.locale = response.locale));
    }
  }

  onSelected(locale: Locale) {
    console.debug(locale);
  }
}
