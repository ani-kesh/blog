import Login from "../components/Login/Login";
import Blog from "../components/Blog/Blog";
import NotFound from "../components/NotFound/NotFound";
import BlogPage from "../components/BlogPage/BlogPage"

export const Routes = { 
  blogPage: (id) => ({
    path: `/blog/:${id}`,
    text: "BlogPage",
    component: BlogPage,
  }),
  blog: () => ({ path: "/blog", text: "Blog", component: Blog }),
  login: () => ({
    path: `/login`,
    text: "Login",
    component: Login,
  }), 
  error:()=>({path:"*",text: "Error", component: NotFound })
};
