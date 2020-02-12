import { all, fork } from 'redux-saga/effects';

import application from './application';
import dashboard from './dashboard';
import flavors from './flavors';
import roles from './roles';
import toast from './toast';
import users from './users';
import vendor from './vendor';
import vendors from './vendors';

export default function* saga() {
  yield all(
    [application, dashboard, flavors, roles, toast, users, vendor, vendors].map(
      fork
    )
  );
}
