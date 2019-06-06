import { DataResolverService } from './resolver/data-resolver.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tabs/tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tabs/tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'tabs/tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { 
    path: 'article-details/:id',
    resolve: {
      article: DataResolverService
    },
    loadChildren: './article-details/article-details.module#ArticleDetailsPageModule' },
  { path: 'tabs/tab1/article-create', loadChildren: './article-create/article-create.module#ArticleCreatePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
