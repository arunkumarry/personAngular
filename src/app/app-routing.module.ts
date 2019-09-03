import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { PersonListComponent } from './person/person-list/person-list.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/persons', pathMatch: 'full'},
    { path: 'persons', component: PersonComponent, children: [{ path: '', component: PersonListComponent}] },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}