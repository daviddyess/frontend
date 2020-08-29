import { lazy } from 'react';

export const imports = {
  AdminPanel: () =>
    import(/* webpackChunkName: "admin" */ 'components/Admin/AdminPanel'),
  Roles: () => import(/* webpackChunkName: "admin" */ 'components/Admin/Roles')
};

export const AdminPanel = lazy(imports.AdminPanel);
export const Roles = lazy(imports.Roles);
