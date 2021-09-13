import React, { Component } from "react";
import GenericRecipe from "./GenericRecipe";
import InputDish from "./InputDish";
import { v4 as uuidv4 } from "uuid";
import imgBowl from "../assets/Bowl.png";
import img404 from "../assets/404.png";
import styles from "./RecipeContainer.module.css";

class RecipeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      dish: "Chicken Adobo"
    };
  }

  fetchRecipe = async (dish = this.state.dish) => {
    const filterDish = dish.replace(" ", "%20");
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${filterDish}&app_id=04d87ff3&app_key=32db41b123e7d896f5f485a84e6a9db8`;
    const data = await fetch(url);
    const items = await data.json();
    // console.log(items);
    this.setState({
      recipes: items.hits
    });
  };

  componentDidMount() {
    const temp = sessionStorage.getItem("dish");
    if (temp) {
      const savedDish = JSON.parse(temp);
      this.fetchRecipe(savedDish);
    } else {
      this.fetchRecipe();
    }
  }

  searchHandler = (dishName) => {
    this.fetchRecipe(dishName);
    this.setState({
      dish: dishName
    });
    const temp = JSON.stringify(dishName);
    sessionStorage.setItem("dish", temp);
  };

  render() {
    if (this.state.recipes.length) {
      return (
        <section>
          <img src={imgBowl} alt="food" className="landingImg" />
          <InputDish searchHandler={this.searchHandler} />
          <div className={styles.itemsContainer}>
            {this.state.recipes.map((recipe) => (
              <GenericRecipe key={uuidv4()} recipe={recipe} />
            ))}
          </div>
        </section>
      );
    } else {
      return (
        <section>
          <InputDish searchHandler={this.searchHandler} />
          <div>
            <h2>Searching . . .</h2>
            <img src={img404} alt="404" className="notFoundImg" />
            <p>If it takes too long</p>
            <p>Please try another search</p>
          </div>
        </section>
      );
    }
  }
}

export default RecipeContainer;
