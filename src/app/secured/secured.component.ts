import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-secured',
    templateUrl: './secured.component.html',
    styleUrls: ['./secured.component.scss'],
})
export class SecuredComponent implements OnInit {

    public appPages = [
        {
            title: 'Dashbaord',
            link: 'dashboard'
        },
        {
            title: 'Masters',
            link: 'master',
            children: [
                {
                    title: 'City Master',
                    link: 'city'
                },
                {
                    title: 'Area Master',
                    link: 'area'
                },
                {
                    title: 'Role Master',
                    link: 'role'
                },
                {
                    title: 'Store Users Status Master',
                    link: 'store-users-status'
                },
                {
                    title: 'Store Status Master',
                    link: 'store-status'
                },
                {
                    title: 'Product Status Master',
                    link: 'product-status'
                }
            ]
        }

    ];

    activeLink: string | null = null

    constructor(
        private _route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activeLink = this._route.snapshot.paramMap.get('type');
        console.log(this.activeLink)
    }

}
