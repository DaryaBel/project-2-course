import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCommentComponent } from './admin-comment/admin-comment.component';
import { OldDeleteComponent } from './old-delete/old-delete.component';


const routes: Routes = [
  { path: "", component: ListComponent },
  { path: "favour", component: FavouriteComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "login", component: AuthorizationComponent },
  { path: "add", component: AddComponent },
  { path: "products/:id", component: ViewComponent },
  { path: "add-role", component: AddRoleComponent },
  { path: "list-user", component: ListUserComponent },
  { path: "dashboard", component: AdminComponent },
  { path: "admin-comment", component: AdminCommentComponent },
  { path: "archive", component: OldDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
