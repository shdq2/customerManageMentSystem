import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {CustomerComponent} from './customer/customer.component';
import {DetailComponent} from './detail/detail.component';
import {MenuComponent} from './menu/menu.component';
const AppRoutes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // 첫 화면을 login 페이지로 설정  
  { path: 'main', component: MainComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.
  { path: 'login', component: LoginComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.
  { path: 'customer', component: CustomerComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.
  { path: 'detail/:id', component: DetailComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.  
  { path: 'menu', component:MenuComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // 잘못된 URL을 사용했을때 Login 페이지로 돌려보냄.
];

export const AppRouterModule = RouterModule.forRoot(AppRoutes, {useHash: true});