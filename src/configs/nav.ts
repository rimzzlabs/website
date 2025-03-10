let navbar = [
  { label: "Home", href: "/" },
  { label: "Now", href: "/now" },
];

let footer = [
  ...navbar,
  {
    label: "Source",
    href: "https://github.com/rimzzlabs/website",
    external: true,
  },
];

let navConfig = { navbar, footer };

export default navConfig;
