import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router: ToastrService = inject(ToastrService);

  const accountservice: AccountService = inject(AccountService);



if(!accountservice.is_login())
{
  router.error('Your passage is not allowed!!!');
  return false;
}
};
