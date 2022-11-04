import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main } from "./components/main/main";
import { Header } from "./components/header/header";
import { SignIn } from "./components/modal-sign-in/modal-sign-in";
import { SignUp } from "./components/modal-sign-up/modal-sign-up";
import { Profile } from "./components/profile/profile";
import { NewArticle } from "./components/new-article/new-article"
import { Articles } from "./components/articles/articles";
import { ArticleDetails } from "./components/article-details/article-details";

import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/article/:slug/edit" component={NewArticle}
          />
          <Route
            path="/article/:slug"
            render={({ match }) => {
              return <ArticleDetails params={match} />;
            }}
          />
          <Route exact path="['/', '/articles']" component={Articles} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/profile" component={Profile} />
          <Route path="/create-article" component={NewArticle} />
          <Route exact path="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
