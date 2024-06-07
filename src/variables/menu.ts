export type TMenu = {
  text: string;
  href: string;
  title: string;
  external?: boolean;
};

export const menu: Array<TMenu> = [
  { text: "Home", href: "/", title: "Homepage" },
  { text: "Writings", href: "/writings", title: "Writings" },
  {
    text: "Connect",
    href: "https://linkeding.com/in/rimzzlabs",
    title: "Connect",
    external: true,
  },
];
