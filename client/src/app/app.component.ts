import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `<div class="app"></div>`
})
export class AppComponent {
    constructor() {
        console.log('AppComponent constructed');
    }
}
