import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DataMySuffixComponent } from './data-my-suffix.component';
import { DataMySuffixDetailComponent } from './data-my-suffix-detail.component';
import { DataMySuffixPopupComponent } from './data-my-suffix-dialog.component';
import { DataMySuffixDeletePopupComponent } from './data-my-suffix-delete-dialog.component';

export const dataRoute: Routes = [
    {
        path: 'data-my-suffix',
        component: DataMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Data'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'data-my-suffix/:id',
        component: DataMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Data'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataPopupRoute: Routes = [
    {
        path: 'data-my-suffix-new',
        component: DataMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Data'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-my-suffix/:id/edit',
        component: DataMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Data'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-my-suffix/:id/delete',
        component: DataMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Data'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
