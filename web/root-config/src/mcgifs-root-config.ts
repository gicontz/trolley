import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication({
  name: "@mcgifs/cashier",
  app: () => System.import("@mcgifs/cashier"),
  activeWhen: (location) => location.pathname.startsWith("/"),
});

start({
  urlRerouteOnly: true,
});
