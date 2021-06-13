import { Component, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CoreConfigService } from '@core/services/config.service';
import {Router} from '@angular/router';
import {UserServiceService} from '../login/user-service.service';
import {User} from '../login/user';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  public coreConfig: any;
public  connected = new User();
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(private _coreConfigService: CoreConfigService,
              private _router: Router,
              private userService:UserServiceService,
              ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  async ngOnInit(){
    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
    this.connected = await this.userService.getUser(+ localStorage.getItem('connected'));
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

 async goToHome() {
console.log(this.connected);
    if (this.connected)
    {
      this._router.navigateByUrl('login');
    }

    switch (this.connected.role) {
      case 'SuperAdmin' :{
      this._router.navigateByUrl('admin/Home');
        break;
      }

      case 'Assistant' : {
        this._router.navigateByUrl('assistants/Home');
        break;
      }

      case 'Client' : {
        this._router.navigateByUrl('clients/Home');
        break;
      }

    }


  }
}
