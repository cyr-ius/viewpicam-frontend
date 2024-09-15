import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Macros } from '../../../core/models/app-models';
import { ReplacePipe } from '../../../core/pipes/replace.pipe';
import { RaspiconfigService } from '../../../core/services/raspiconfig.service';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-adm-macros',
  standalone: true,
  imports: [FormsModule, ReplacePipe, CommonModule],
  templateUrl: './adm-macros.component.html'
})
export class AdmMacrosComponent {


  macros = <Macros[]> []
  macro = <Macros> {state:false}

  constructor(
    private settingsService:SettingsService,
    private raspiConfig: RaspiconfigService
  ){}


  ngOnInit(): void {
    this.listMacros()
  }

  listMacros(){
    this.settingsService.getMacros().subscribe((rsp)=>{
      this.macros = rsp
    })
  }

  onChange(name:string, command:string, state:boolean){
    this.macro.name = name
    this.macro.command = command
    this.macro.state = state
    this.settingsService.setMacros(this.macro).subscribe((rsp)=>{
      this.listMacros()
    })
  }

  sendCmd(cmd:string,params:any){
    this.raspiConfig.sendCmd(cmd, params);
  }

}
