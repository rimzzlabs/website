export type TMenu = {
  text: string;
  href: string;
  title: string;
  external?: boolean;
};

export const menu: Array<TMenu> = [
  { text: "Home", href: "/", title: "Homepage" },
  { text: "Blog", href: "/blog", title: "Blog" },
  {
    text: "Connect",
    href: "https://linkedin.com/in/rimzzlabs",
    title: "Connect",
    external: true,
  },
];
