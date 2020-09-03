import { lazy } from 'react';

export const imports = {
  AdminPanel: () =>
    import(/* webpackChunkName: "admin" */ 'components/Admin/AdminPanel'),
  Migrations: () =>
    import(
      /* webpackChunkName: "admin-migrations" */ 'components/Admin/Migrations'
    ),
  Roles: () =>
    import(/* webpackChunkName: "admin-roles" */ 'components/Admin/Roles'),
  Users: () =>
    import(/* webpackChunkName: "admin-roles" */ 'components/Admin/Users')
};

export const AdminPanel = lazy(imports.AdminPanel);
export const Migrations = lazy(imports.Migrations);
export const Roles = lazy(imports.Roles);
export const Users = lazy(imports.Users);
