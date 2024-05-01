import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityMasterPage } from './city-master.page';

describe('CityMasterPage', () => {
    let component: CityMasterPage;
    let fixture: ComponentFixture<CityMasterPage>;

    beforeEach(async(() => {
        fixture = TestBed.createComponent(CityMasterPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

function async(arg0: () => void): jasmine.ImplementationCallback {
    throw new Error('Function not implemented.');
}
