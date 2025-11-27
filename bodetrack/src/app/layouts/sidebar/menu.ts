import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENU',
    isTitle: true,
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.LIST.ECOMMERCE',
    link: '/',
    parentId: 1,
  },
  {
    id: 3,
    label: 'Cargos',
    icon: 'ph-folder-open',
    link: '/general/cargos/list',
    parentId: 1,
  },
  {
    id: 4,
    label: 'Entradas',
    icon: 'ph-arrow-down-left',
    link: '/inventario/entradas/list',
    parentId: 2,
  },
  {
    id: 5,
    label: 'Salidas',
    icon: 'ph-arrow-up-right',
    link: '/inventario/salidas/list',
    parentId: 2,
  },
];
