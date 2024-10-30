import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { BillsComponent } from './components/bills/bills.component';
import { StartComponent } from './components/start/start.component';
import { AddnewuserComponent } from './components/addnewuser/addnewuser.component';
import { NotificationComponent } from './components/notification/notification.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
const routes: Routes = [

{


path:"users",component :UsersComponent,title:'userspage'

}
,
{
  path:"userdetails/:n_users_id",component:UserdetailsComponent,title:"userdetails"
}
,
{

  path:"bills/:n_users_id",component:BillsComponent,title:"bills"
}
,

{

  path:"dashboard/:n_users_id",component:DashboardComponent,title:"dashboard"
}
,
{
  path:"start",component:StartComponent,title:"start"
}

,{
  path:"addnewuser",component:AddnewuserComponent,title:"addnewuser"
}
,{
  path:"notification",component:NotificationComponent,title:"notification"
}
,{
  path:'signup',component:SignupComponent,title:'signup'
}
,{path:'login',component:LoginComponent,title:'login'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
