export type TMenu = {
  text: string;
  href: string;
  title: string;
  external?: boolean;
};

export let menu: Array<TMenu> = [
  { text: "Home", href: "/", title: "Homepage" },
  { text: "Blog", href: "/blog", title: "Blog" },
  {
    text: "Connect",
    href: "https://linkedin.com/in/rimzzlabs",
    title: "Connect",
    external: true,
  },
  {
    text: "Source",
    href: "https://github.com/rimzzlabs/website",
    title: "View this websites' source code",
    external: true,
  },
];
