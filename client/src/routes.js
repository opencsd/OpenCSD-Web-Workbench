/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Workbench from "views/Workbench.js";
import Energy from "views/examples/Energy.js";
import Pushdown from "views/examples/Pushdown.js";

var routes = [
  {
    path: "/workbench",
    name: "Workbench",
    icon: "ni ni-tv-2 text-primary",
    component: Workbench,
    layout: "/admin",
  },

  {
    path: "/pushdown",
    name: "Pushdown Effect Check",
    icon: "ni ni-chart-bar-32 text-red",
    component: Pushdown,
    layout: "/admin",
  },

  {
    path: "/energy",
    name: "Energy",
    icon: "ni ni-button-power text-warning",
    component: Energy,
    layout: "/admin",
  },
];
export default routes;
