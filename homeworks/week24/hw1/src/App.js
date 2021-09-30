import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/pages/HomePage/HomePage";
import PostPage from "./components/pages/PostPage/PostPage";
import AboutMePage from "./components/pages/AboutMePage/AboutMePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import ArticlePage from "./components/pages/ArticlePage/ArticlePage";
import EditArticlePage from "./components/pages/EditArticlePage/EditArticlePage";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/index/:page">
            <HomePage />
          </Route>
          <Route path="/new-post">
            <PostPage />
          </Route>
          <Route path="/about-me">
            <AboutMePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
        </Switch>
        <Route path="/posts/:id">
          <ArticlePage />
        </Route>
        <Route path="/edit/:id">
          <EditArticlePage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
