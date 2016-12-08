import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.css'],
    templateUrl: './app.html'
})
export class AppComponent {
    constructor() {
        console.log('AppComponent constructed');
    }
}
