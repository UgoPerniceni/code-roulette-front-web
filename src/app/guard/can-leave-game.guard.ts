import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CanDeactivate} from '@angular/router';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class CanLeaveGameGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    // if there are no pending changes, just allow deactivation; else confirm first
    return component.canDeactivate() ?
      true : confirm('WARNING: You are in an unfinished game, if you leave now you will loose. ' +
        'Press Cancel to go back, or OK to forfeit the game.');
  }
}

