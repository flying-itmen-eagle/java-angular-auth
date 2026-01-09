import { Routes } from '@angular/router';
import { Login } from './pages/login/login'; // 注意這裡匯入的是 Login Class
import { UserListComponent } from './user-list/user-list';
import { AddUser } from './pages/add-user/add-user';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 登入頁 (不需要 Guard)
  { path: 'login', component: Login },

  // 使用者列表 (需要登入)
  { 
    path: 'users', 
    component: UserListComponent, 
    canActivate: [authGuard] 
  },

  // 新增使用者 (需要登入)
  { 
    path: 'add-user', 
    component: AddUser, 
    canActivate: [authGuard] 
  },

  // 預設路徑：導向 users (會被 Guard 攔截並導向 login)
  { path: '', redirectTo: '/users', pathMatch: 'full' },

  // 萬用路徑：隨便亂打網址都導回 login
  { path: '**', redirectTo: '/login' }
];
