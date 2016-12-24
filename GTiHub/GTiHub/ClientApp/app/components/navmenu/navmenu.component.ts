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
                label: "Projects",
                icon: "fa-dashboard",
                items: [
                    {
                        label: "View All",
                        icon: "fa-binoculars",
                        routerLink: ["/project-list"]
                    },
                    {
                        label: "New",
                        icon: "fa-plus",
                    }
                ]
            },
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
                    }
                ]
            },
            {
                label: "Admin Tools",
                icon: "fa-cog",
                items: [
                    {
                        label: "Users",
                        icon: "fa-users",
                        items: [
                            {
                                label: "View All",
                                icon: "fa-binoculars",
                                routerLink: ["/user-list"]
                            },
                            {
                                label: "New",
                                icon: "fa-user-plus",
                            }
                        ]
                    },
                    {
                        label: "Clients",
                        icon: "fa-user",
                        items: [
                            {
                                label: "View All",
                                icon: "fa-binoculars",
                                routerLink: ["/client-list"]
                            },
                            {
                                label: "New",
                                icon: "fa-user-plus",
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
