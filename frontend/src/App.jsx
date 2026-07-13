import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./AppLayout";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Groups from "./Pages/Groups";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import AddGroup from "./Components/Group/AddGroup";
import AddMember from "./Components/Group/AddMember";
import RemoveMember from "./Components/Group/RemoveMember";
import UpdateGroup from "./Components/Group/UpdateGroup";
import Expenses from "./Pages/Expenses";
import AddExpenses from "./Components/Expenses/AddExpense";
import ViewExpense from "./Components/Expenses/ViewExpense";
import UpdateExpense from "./Components/Expenses/UpdateExpense";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "groups",
        element: <Groups />,
      },
      {
        path: "addgroup",
        element: <AddGroup />,
      },
      {
        path:"updategroup",
        element:<UpdateGroup/>
      },
      {
        path:"addgroupmember",
        element:<AddMember/>
      },
      {
        path:"removegroupmember",
        element:<RemoveMember/>
      },
      {
        path:"/:groupId/expenses",
        element:<Expenses/>
      },
      {
        path:"addexpense",
        element:<AddExpenses/>
      },
      {
        path:"updateexpense",
        element:<UpdateExpense/>
      },
      {
        path:`/groups/:groupId/expenses/:id`,
        element:<ViewExpense/>
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "error",
        element: <Error />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
