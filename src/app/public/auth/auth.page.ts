import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AppFunctionsService } from 'src/app/core/services/app-functions.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

    @ViewChild('signInNgForm') signInNgForm!: NgForm
    signInForm!: UntypedFormGroup


    public env: any = environment

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _authService: AuthService,
        private _af: AppFunctionsService,
        private _router: Router
    ) { }



    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit() {

        if (this._authService.checkUserValidSession()) {
            this._router.navigateByUrl('/u/dashboard', { replaceUrl: true })
        }

        this.signInForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        })

    }

    /**
     * On Destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Sign In
     */
    authenticate(): void {

        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        //Payload
        let reqData = {
            username: this.signInForm.value.username,
            password: this.signInForm.value.password
        }

        this._authService.validate(reqData).subscribe({
            complete: () => {
                this.signInForm.enable()
            },
            next: (res) => {
                if (res.code === 200) {
                    this._router.navigateByUrl('/u/dashboard', { replaceUrl: true })
                }
            },
            error: (err) => {
                this.signInForm.enable()
                console.log(err)
                // this._af.presentToast('top', this.pageErrors[err.error.error.error_code], 'danger')
            }
        })

    }

}
