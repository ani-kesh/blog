import Login from "../components/Login/Login";
import Blog from "../components/Blog/Blog";
import BlogPage from "../components/BlogPage/BlogPage";
import NotFound from "../components/NotFound/NotFound";
import AddComment from "../components/AddComment/AddComment";

export const Routes = {
  blog: () => ({ path: `/`, text: "Blog", component: Blog }),
  blog_page: (id, userId) => ({
    path: `/blog/:${id}/:${userId}`,
    text: "Blog Page",
    component: BlogPage,
  }),
  login: () => ({
    path: `/login`,
    text: "Log in",
    component: Login,
  }),
  addComment: () => ({
    path: `/comment`,
    text: "Add Comment",
    component: AddComment,
  }),
  error: () => ({ path: "*", text: "Error", component: NotFound }),
};
