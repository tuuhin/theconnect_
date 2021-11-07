import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpRoute from "./Routes/SignUpRoute";
import SignInRoute from "./Routes/SignInRoute";
import HomeRoute from "./Routes/HomeRoute";
import ProfileRoute from "./Routes/ProfileRoute";
import LogStatus from "./Context/NavContext";
function App() {
  return (
    <LogStatus>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomeRoute} />
          <Route exact path="/sign-up" component={SignUpRoute} />
          <Route exact path="/sign-in" component={SignInRoute} />
          <Route exact path="/profile" component={ProfileRoute} />
        </Switch>
      </Router>
    </LogStatus>
  );
}

export default App;
