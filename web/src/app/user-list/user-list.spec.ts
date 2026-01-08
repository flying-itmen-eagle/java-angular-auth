import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

// 手動宣告 jasmine 以解決 IDE 找不到型別定義的紅字問題
declare var jasmine: any;

import { UserListComponent } from './user-list';
import { UserService } from '../services/user.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    // 建立 UserService 的 Mock 物件，避免測試時需要真實的 HTTP 請求
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser']);
    userServiceSpy.getUsers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
