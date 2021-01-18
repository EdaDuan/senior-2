import { Success } from "../pages/success/Success";
import { Sign } from "../pages/sign/Sign";
const router = () => {
  return [
    {
      path: "/success/",
      exact: true,
      component: Success,
    },
    {
      path: "/",
      exact: true,
      component: Sign,
    },
  ];
};
export default router();
