export type TNav = {
  id: string;
  label: string;
  href: string;
};

export const navs: TNav[] = [
  {
    id: 'DASHBOARD',
    label: 'Dashboard',
    href: '/home',
  },
  {
    id: 'CASHIER',
    label: 'Cashier',
    href: '/cashier',
  },
  {
    id: 'INVENTORY',
    label: 'Inventory',
    href: '/inventory',
  },
];
