import React, { Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Spin from "./components/spinner/spinner";
import { AuthProvider } from "./context/AuthContext";

const Header = lazy(() => import("./components/common/header"));
const Home = lazy(() => import("./components/home"));
const MerchandiseHead = lazy(() =>
  import("./components/merchandise/merchandiseHead")
);
const MerchandiseTshirt = lazy(() =>
  import("./components/merchandise/merchandisetshirt")
);
const WishList = lazy(() => import("./components/wishlist/wishlist"));
const Footer = lazy(() => import("./components/common/footer"));
const Login = lazy(() => import("./components/login/login"));
const Register = lazy(() => import("./components/signup/register"));
const Profile = lazy(() => import("./components/account/profile"));
const Order = lazy(() => import("./components/order/order"));
const Cart = lazy(() => import("./components/cart/cart"));
const Checkout = lazy(() => import("./components/checkout/checkout"));
const Thanks = lazy(() => import("./components/Thanks"));
const Fail = lazy(() => import("./components/Fail"));
function App(props) {
  return (
    <>
      <AuthProvider>
        <Router>
          <Suspense fallback={<Spin />}>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/merchandise" exact component={MerchandiseHead} />
              <Route path="/wishlist" exact component={WishList} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/profile" component={Profile} />
              <Route path="/order" exact component={Order} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/checkout" exact component={Checkout} />
              <Route path="/thanks" exact component={Thanks} />
              <Route path="/failed" exact component={Fail} />
              <Route
                path="/tshirtmerchandise"
                exact
                component={MerchandiseTshirt}
              />
            </Switch>
            <Footer />
          </Suspense>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
