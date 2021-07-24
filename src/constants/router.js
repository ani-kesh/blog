import Login from "../components/Login/Login";
import Blog from "../components/Blog/Blog";
import NotFound from "../components/NotFound/NotFound";
import BlogPage from "../components/BlogPage/BlogPage";
import AddComment from "../components/AddComment/AddComment"

export const Routes = { 
  blogPage: (id) => ({
    path: `/blog/:${id}`,
    text: "Blog Page",
    component: BlogPage,
  }),
  blog: () => ({ path: "/blog", text: "Blog", component: Blog }),
  login: () => ({
    path: `/login`,
    text: "Login",
    component: Login,
  }), 
  addComment:(id) => ({
    path: `/comment/:${id}`,
    text: "Add Comment",
    component: AddComment,
  }),
  error:()=>({path:"*",text: "Error", component: NotFound })
};
