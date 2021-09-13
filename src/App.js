import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipeContainer from "./Component/RecipeContainer";
import RecipeDish from "./Component/RecipeDish";
import { FaSun, FaMoon } from "react-icons/fa";
import Darktheme from "./Component/Darktheme";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1>Luto</h1>
            <Darktheme />
          </header>
          <Switch>
            <Route path="/" exact component={RecipeContainer} />
            <Route path="/:id" exact component={RecipeDish} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
