import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Command, Macro, RaspiconfigService, SettingsService } from '../../../client';
import { ReplacePipe } from '../../../core/pipes/replace.pipe';

@Component({
  selector: 'app-adm-macros',
  standalone: true,
  imports: [FormsModule, ReplacePipe, CommonModule],
  templateUrl: './adm-macros.component.html',
})
export class AdmMacrosComponent {
  macros = <Macro[]>[];
  macro = <Macro>{ state: false };

  constructor(
    private raspiConfig: RaspiconfigService,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    this.listMacros();
  }

  listMacros() {
    this.settings.settingsGetMacro().subscribe((rsp) => {
      this.macros = rsp;
    });
  }

  onChange(name: string, command: string, state: boolean) {
    const macro = <Macro>({name:name, command: command, state: state})
    this.settings.settingsPostMacro(macro).subscribe(() => {
      this.listMacros();
    });
  }

  sendCmd(cmd: string, params: any) {
    if ( ! Array.isArray(params))
      params = [params]
    const data = <Command>({ cmd: cmd, params: params });
    this.raspiConfig.raspiconfigPost(data).subscribe();
  }
}
