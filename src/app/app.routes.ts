import { Routes } from '@angular/router';
import { ThumbsListComponent } from './components/gallery/thumbs-list.component';
import { HelpComponent } from './components/help/help.component';
import { LogComponent } from './components/log/log.component';
import { MultiviewComponent } from './components/multiview/multiview.component';
import { PreviewComponent } from './components/preview/preview.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { SettingsComponent } from './components/settings/settings.component';
import { authGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { FirstFactorComponent } from './login/first-factor/first-factor.component';
import { SecondFactorComponent } from './login/second-factor/second-factor.component';

export const routes: Routes = [
  {path:'', redirectTo:'preview', pathMatch: 'full'},
  {path:'login', component: FirstFactorComponent, title:"ViewPi Camera"},
  {path:'mfa', component: SecondFactorComponent, title:"Second factor"},
  {path:'preview', component: PreviewComponent, canActivate: [authGuard], title: "Preview"},
  {path:'gallery/:id', component: ThumbsListComponent, canActivate: [authGuard], title: "Gallery"},
  {path:'gallery', component: ThumbsListComponent, canActivate: [authGuard], title: "Gallery"},
  {path:'multiview', component: MultiviewComponent, canActivate: [authGuard], title: "Multiview"},
  {path:'multiview/:id', component: MultiviewComponent, canActivate: [authGuard], title: "Multiview"},
  {path:'scheduler', component: SchedulerComponent, canActivate: [authGuard], title: "Scheduler"},
  {path:'settings', component: SettingsComponent, canActivate: [authGuard], title: "Settings"},
  {path:'log', component: LogComponent, canActivate: [authGuard], title:"Logs"},
  {path:'help', component: HelpComponent, canActivate: [authGuard], title: "Help"},
  {path:'**', component: PageNotFoundComponent}
];
