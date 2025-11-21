import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARD.TEXT',
        icon: 'ph-gauge',
        subItems: [
            {
                id: 3,
                label: 'MENUITEMS.DASHBOARD.LIST.ANALYTICS',
                link: null,
                parentId: 2
            },
            {
                id: 4,
                label: 'MENUITEMS.DASHBOARD.LIST.CRM',
                link: null,
                parentId: 2
            },
            {
                id: 5,
                label: 'MENUITEMS.DASHBOARD.LIST.ECOMMERCE',
                link: '/',
                parentId: 2
            },
            {
                id: 6,
                label: 'MENUITEMS.DASHBOARD.LIST.LEARNING',
                link: null,
                parentId: 2
            },
            {
                id: 7,
                label: 'MENUITEMS.DASHBOARD.LIST.REALESTATE',
                link: null,
                parentId: 2
            }
        ]
    },
    {
        id: 61,
        label: 'MENUITEMS.AUTHENTICATION.TEXT',
        icon: 'ph-user-circle',
        subItems: [
            {
                id: 62,
                label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNIN',
                link: '/auth/signin',
                parentId: 61,
            },
            {
                id: 63,
                label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNUP',
                link: '/auth/signup',
                parentId: 61,
            },
            {
                id: 64,
                label: 'MENUITEMS.AUTHENTICATION.LIST.PASSWORDRESET',
                link: '/auth/pass-reset',
                parentId: 61,
            },
            {
                id: 65,
                label: 'MENUITEMS.AUTHENTICATION.LIST.PASSWORDCREATE',
                link: '/auth/pass-change',
                parentId: 61,
            },
            {
                id: 66,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
                link: '/auth/lockscreen',
                parentId: 61
            },
            {
                id: 67,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOGOUT',
                link: '/auth/logout',
                parentId: 61
            },
            {
                id: 68,
                label: 'MENUITEMS.AUTHENTICATION.LIST.SUCCESSMESSAGE',
                link: '/auth/success-msg',
                parentId: 61
            },
            {
                id: 69,
                label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
                link: '/auth/twostep',
                parentId: 61
            },
            {
                id: 70,
                label: 'MENUITEMS.AUTHENTICATION.LIST.ERRORS',
                parentId: 61,
                isCollapsed: true,
                subItems: [
                    {
                        id: 71,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.404ERROR',
                        link: '/auth/errors/404',
                        parentId: 70
                    },
                    {
                        id: 72,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.500',
                        link: '/auth/errors/500',
                        parentId: 70
                    },
                    {
                        id: 73,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.503',
                        link: '/auth/errors/503',
                        parentId: 70
                    },
                    {
                        id: 74,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.OFFLINE',
                        link: '/auth/errors/offline',
                        parentId: 70
                    },
                ]
            },
        ]
    },
    {
        id: 75,
        label: 'MENUITEMS.EXTRAPAGES.TEXT',
        icon: 'ph-address-book',
        subItems: [
            {
                id: 76,
                label: 'MENUITEMS.EXTRAPAGES.LIST.STARTER',
                link: '/pages/starter',
                parentId: 75
            },
            {
                id: 77,
                label: 'MENUITEMS.EXTRAPAGES.LIST.PROFILE',
                link: '/pages/profile',
                parentId: 75,
            },
            {
                id: 78,
                label: 'MENUITEMS.EXTRAPAGES.LIST.PROFILESETTINGS',
                link: '/pages/profile-settings',
                parentId: 75,
            },
            {
                id: 79,
                label: 'MENUITEMS.EXTRAPAGES.LIST.CONTACTS',
                link: '/pages/contacts',
                parentId: 75
            },
            {
                id: 80,
                label: 'MENUITEMS.EXTRAPAGES.LIST.TIMELINE',
                link: '/pages/timeline',
                parentId: 75
            },
            {
                id: 81,
                label: 'MENUITEMS.EXTRAPAGES.LIST.FAQS',
                link: '/pages/faqs',
                parentId: 75
            },
            {
                id: 82,
                label: 'MENUITEMS.EXTRAPAGES.LIST.PRICING',
                link: '/pages/pricing',
                parentId: 75
            },
            {
                id: 83,
                label: 'MENUITEMS.EXTRAPAGES.LIST.MAINTENANCE',
                link: '/pages/maintenance',
                parentId: 75
            },
            {
                id: 84,
                label: 'MENUITEMS.EXTRAPAGES.LIST.COMINGSOON',
                link: '/pages/coming-soon',
                parentId: 75
            },
            {
                id: 85,
                label: 'MENUITEMS.EXTRAPAGES.LIST.PRIVACYPOLICY',
                link: '/pages/privacy-policy',
                parentId: 75
            },
            {
                id: 86,
                label: 'MENUITEMS.EXTRAPAGES.LIST.TERMS&CONDITIONS',
                link: '/pages/term-conditions',
                parentId: 75
            }
        ]
    },
    {
        id: 168,
        label: 'MENUITEMS.MULTILEVEL.TEXT',
        icon: 'bi bi-share',
        subItems: [
            {
                id: 169,
                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
                parentId: 168
            },
            {
                id: 170,
                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
                parentId: 168,
                subItems: [
                    {
                        id: 171,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
                        parentId: 170
                    },
                    {
                        id: 172,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
                        parentId: 170,
                        subItems: [
                            {
                                id: 173,
                                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.LEVEL3.1',
                                parentId: 172
                            },
                            {
                                id: 174,
                                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.LEVEL3.2',
                                parentId: 172,

                            }
                        ]
                    }
                ]
            }
        ]
    }
]