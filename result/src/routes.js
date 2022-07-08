import CountryPage from "./pages/Country";
import HomePage from "./pages/Home";

export default {
  root: "home",
  routes: [
    {
      path: "home",
      component: HomePage,
      widgets: ["Navbar"],
    },
    {
      path: "country/:countryId",
      component: CountryPage,
      widgets: ["Navbar"],
    },
  ],
};
