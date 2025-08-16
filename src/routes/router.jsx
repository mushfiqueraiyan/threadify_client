import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPost from "../pages/dashboard/AddPost";
import SinglePost from "../pages/posts/SinglePost";
import AddAnnouncement from "../pages/announcement/AddAnnouncement";
import MyPosts from "../pages/posts/MyPosts";
import MyComments from "../pages/posts/MyComments";
import Membership from "../pages/membership/Membership";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/ManageUsers";
import ReportedComment from "../pages/ReportedComment";
import Forbidden from "../pages/Forbidden";
import AdminRoute from "./AdminRoute";
import StripeCheckout from "../pages/membership/StripeCheckout";
import Pricing from "../pages/membership/Pricing";
import About from "../pages/about/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/posts/:id",
        element: <SinglePost />,
        loader: ({ params }) =>
          fetch(`https://threadify-server.vercel.app/posts/${params.id}`).then(
            (res) => {
              if (!res.ok) throw new Response("Not Found", { status: 404 });
              return res.json();
            }
          ),
      },
      {
        path: "/membership",
        element: (
          <PrivateRoute>
            <Pricing />
          </PrivateRoute>
        ),
      },
      {
        path: "/membership/checkout",
        element: (
          <PrivateRoute>
            <Membership />
          </PrivateRoute>
        ),
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "add-post",
        element: (
          <PrivateRoute>
            <AddPost />
          </PrivateRoute>
        ),
      },
      {
        path: "my-posts",
        element: (
          <PrivateRoute>
            <MyPosts />
          </PrivateRoute>
        ),
      },
      {
        path: "my-comments/:id",
        element: <MyComments />,
        loader: ({ params }) =>
          fetch(
            `https://threadify-server.vercel.app/posts/${params.id}/comments`
          ),
      },
      {
        path: "add-announcement",
        element: (
          <AdminRoute>
            <AddAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "reported-comments",
        element: (
          <AdminRoute>
            <ReportedComment />
          </AdminRoute>
        ),
      },
    ],
  },
]);
