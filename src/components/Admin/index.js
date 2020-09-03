import { lazy } from 'react';

export const imports = {
  AdminPanel: () =>
    import(/* webpackChunkName: "admin" */ 'components/Admin/AdminPanel'),
  Migrations: () =>
    import(
      /* webpackChunkName: "admin-migrations" */ 'components/Admin/Migrations'
    ),
  Roles: () =>
    import(/* webpackChunkName: "admin-roles" */ 'components/Admin/Roles')
};

export const AdminPanel = lazy(imports.AdminPanel);
export const Migrations = lazy(imports.Migrations);
export const Roles = lazy(imports.Roles);
