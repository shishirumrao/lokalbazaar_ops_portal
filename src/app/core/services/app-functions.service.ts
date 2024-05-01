import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AppFunctionsService {

    constructor(
        private _toastController: ToastController,
        private _httpClient: HttpClient
    ) { }


    // -----------------------------------------------------------------------------------------------------
    // @ Form Validators
    // -----------------------------------------------------------------------------------------------------    

    async mobileNumberValidator(control: FormControl) {
        const value = control.value;
        if (value && /^\d{10,}$/.test(value)) {
            return null; // Validation passes
        } else {
            return { invalidMobileNumber: true }; // Validation fails
        }
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public Methods
    // -----------------------------------------------------------------------------------------------------    


    async presentToast(position: 'top' | 'middle' | 'bottom', msg: string, type: 'success' | 'warning' | 'danger' | 'default') {
        let toastArguments: ToastOptions = {
            message: msg,
            duration: 5000,
            cssClass: `${type}-toast`,
            position: position,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel',
                },
            ]
        }

        if (type != 'default') {
            toastArguments['color'] = type
        }


        const toast = await this._toastController.create(toastArguments);

        await toast.present();
    }



}
