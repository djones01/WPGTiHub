import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/primeng";

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent implements OnInit {
    private menuItems: MenuItem[]

    ngOnInit() {
        this.menuItems = [
            {
                label: "Sources",
                items: [
                    {
                        label: "View All",
                        icon: "fa-binoculars",
                        routerLink: ["/src-list"]
                    },
                    {
                        label: "New",
                        icon: "fa-plus",
                        routerLink: ["/src-edit"]
                    }
                ]
            },
            {
                label: "Targets",
                items: [
                    {
                        label: "View All",
                        icon: "fa-binoculars",
                        routerLink: ["/tgt-list"]
                    },
                    {
                        label: "New",
                        icon: "fa-plus",
                        routerLink: ["/tgt-edit"]
                    }
                ]
            },
            {
                label: "Maps",
                items: [
                    {
                        label: "View All",
                        icon: "fa-binoculars",
                        routerLink: ["/map-list"]
                    },
                    {
                        label: "New",
                        icon: "fa-plus",
                        routerLink: ["/map-edit"]
                    }
                ]
            }
        ];
    }
}
