import CountryPage from "./pages/Country";
import HomePage from "./pages/Home";

export default {
  root: "home",
  routes: [
    {
      path: "home",
      component: HomePage,
    },
    {
      path: "country/:countryId",
      component: CountryPage,
    },
  ],
};
