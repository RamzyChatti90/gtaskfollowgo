import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'gtaskfollowgoApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'app-user',
    data: { pageTitle: 'gtaskfollowgoApp.appUser.home.title' },
    loadChildren: () => import('./app-user/app-user.routes'),
  },
  {
    path: 'task',
    data: { pageTitle: 'gtaskfollowgoApp.task.home.title' },
    loadChildren: () => import('./task/task.routes'),
  },
  {
    path: 'tag',
    data: { pageTitle: 'gtaskfollowgoApp.tag.home.title' },
    loadChildren: () => import('./tag/tag.routes'),
  },
  {
    path: 'comment',
    data: { pageTitle: 'gtaskfollowgoApp.comment.home.title' },
    loadChildren: () => import('./comment/comment.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
