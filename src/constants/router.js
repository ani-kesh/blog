import Login from "../components/Login/Login";
import Blog from "../components/Blog/Blog";
import NotFound from "../components/NotFound/NotFound";

export const Routes = {
  blog: () => ({ path: "/blog", text: "Blog", component: Blog }),
  login: () => ({
    path: `/login`,
    text: "Login",
    component: Login,
  }),
  error:()=>({path:"*",text: "Error", component: NotFound })
};
