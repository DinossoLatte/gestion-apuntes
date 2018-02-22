import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FolderMySuffixComponent } from './folder-my-suffix.component';
import { FolderMySuffixDetailComponent } from './folder-my-suffix-detail.component';
import { FolderMySuffixPopupComponent } from './folder-my-suffix-dialog.component';
import { FolderMySuffixDeletePopupComponent } from './folder-my-suffix-delete-dialog.component';

export const folderRoute: Routes = [
    {
        path: 'folder-my-suffix',
        component: FolderMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Folders'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'folder-my-suffix/:id',
        component: FolderMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Folders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const folderPopupRoute: Routes = [
    {
        path: 'folder-my-suffix-new',
        component: FolderMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Folders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'folder-my-suffix/:id/edit',
        component: FolderMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Folders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'folder-my-suffix/:id/delete',
        component: FolderMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Folders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
