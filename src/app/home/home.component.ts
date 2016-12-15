import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bm-home',
    template: `
<div class="ui container">
    <h1>Home</h1>
    <p>Das ist der BookMonkey.</p>
    <a routerLink="../books" class="ui red button">
      Buchliste ansehen
      <i class="right arrow icon"></i>
    </a>
  </div>
`,
    styles: []
})
export class HomeComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
