import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
    selector: '[bmDelay]'
})
export class DelayDirective implements OnInit {
    @Input() bmDelay: number = 500;

    constructor(private templateRev: TemplateRef<any>,
                private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.viewContainerRef.createEmbeddedView(this.templateRev);
        }, this.bmDelay);
    }
}
