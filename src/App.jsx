import { Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutAccount from "./layout/layoutAccount/LayoutAccount";
import Login from "./login/Login";
import Register from "./login/Register";
import EmailVerified from "./login/EmailVerified";
import RefectPassword from "./login/RefectPassword";
import AdminRouter from "./routers/AdminRouter";
import LayoutAdmin from "./layout/layoutAdmin/LayoutAdmin";
import Home from "./pages/account/home/Home";
import Category from "./pages/admin/category/Category";
import Movie from "./pages/admin/movie/Movie";
import DetailMovie from "./detailMovie/DetailMovie";
import WatchMovie from "./watchMovie/WatchMovie";

function App() {
  return (
    <>
      {/* ------------ Account -------------------*/}
      <Routes>
        <Route
          path="/"
          element={
            <LayoutAccount>
              <Home />
            </LayoutAccount>
          }
        ></Route>
        <Route
          path="/movie/:slug"
          element={
            <LayoutAccount>
              <DetailMovie />
            </LayoutAccount>
          }
        ></Route>
        <Route
          path="/watch/:slug"
          element={
            <LayoutAccount>
              <WatchMovie />
            </LayoutAccount>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/emailverified" element={<EmailVerified />}></Route>
        <Route path="/refectpassword" element={<RefectPassword />}></Route>

        {/* ------------ Account -------------------*/}
        <Route
          path="/admin"
          element={
            <AdminRouter>
              <LayoutAdmin />
            </AdminRouter>
          }
        >
          <Route path="" element={<LayoutAdmin />}>
            <Route index element={<Category />} />
            <Route path="movie" element={<Movie />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
