import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SubjectMySuffixComponent } from './subject-my-suffix.component';
import { SubjectMySuffixDetailComponent } from './subject-my-suffix-detail.component';
import { SubjectMySuffixPopupComponent } from './subject-my-suffix-dialog.component';
import { SubjectMySuffixDeletePopupComponent } from './subject-my-suffix-delete-dialog.component';

export const subjectRoute: Routes = [
    {
        path: 'subject-my-suffix',
        component: SubjectMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Subjects'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'subject-my-suffix/:id',
        component: SubjectMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Subjects'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subjectPopupRoute: Routes = [
    {
        path: 'subject-my-suffix-new',
        component: SubjectMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Subjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subject-my-suffix/:id/edit',
        component: SubjectMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Subjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subject-my-suffix/:id/delete',
        component: SubjectMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Subjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
