import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { CarDetail } from "./pages/car";
import { Dashborad } from "./pages/dashboard";
import { New } from "./pages/dashboard/new";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Private } from "./routes/privaterRoutes";

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/car/id",
        element: <CarDetail/>
      },
      {
        path: "/dashboard",
        element: <Private><Dashborad/></Private>
      },
      {
        path: "/dashboard/new",
        element: <Private><New/></Private>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }

])
export {router}