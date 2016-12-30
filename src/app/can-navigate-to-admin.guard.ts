import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CanNavigateToAdminGuard implements CanActivate {

    private accessGranted = false;
    private askedUser = false;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (!this.askedUser) {
            this.askedUser = true;
            this.accessGranted = window.confirm('Mit großer Macht kommt große Verantwortung. Möchten Sie den Amin-Bereich betreten?');
        }
        return this.accessGranted;
    }
}
