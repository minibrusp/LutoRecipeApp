import React, { Component } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./RecipeDish.module.css";

class RecipeDish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: ""
    };
  }

  fetchRecipe = async () => {
    const url = `https://api.edamam.com/api/recipes/v2/${this.props.match.params.id}?type=public&app_id=04d87ff3&app_key=32db41b123e7d896f5f485a84e6a9db8`;
    const data = await fetch(url);
    const item = await data.json();
    // console.log(item);
    this.setState({
      recipe: item.recipe
    });
  };

  componentDidMount() {
    this.fetchRecipe();
  }

  render() {
    // console.log(this.props.match.params);
    // console.log(this.state.recipe);

    const {
      label,
      image,
      calories,
      dishType,
      mealType,
      ingredientLines,
      url
    } = this.state.recipe;

    let ingredientsArray = [];
    for (const key in ingredientLines) {
      ingredientsArray.push(ingredientLines[key]);
    }

    return (
      <div className={styles.dish}>
        <Link to={"/"} className="links" title="back to homepage">
          Back to homepage
        </Link>

        <article>
          <header>
            <img src={image} alt="dish" />
            <h2>{label}</h2>
            <p>
              Calories: <span>{Math.round(calories)}</span>
            </p>
            <p>
              Dish Type: <span>{dishType}</span>
            </p>
            <p>
              Meal Type: <span>{mealType}</span>
            </p>
          </header>
          <section className={`dishIngredients ${styles.dishIngredients}`}>
            <h3>
              <span>{ingredientsArray.length}</span> Ingredients
            </h3>
            <div>
              <ul>
                {ingredientsArray.map((item) => (
                  <li key={uuidv4()}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
          <section className={`preparation ${styles.preparation}`}>
            <h3>Preparation</h3>
            <p>
              Please see
              <a href={url} target="true" title="to instructions">
                Instructions
              </a>
            </p>
          </section>
        </article>
        <Link to={"/"} className="links" title="back to homepage">
          Back to homepage
        </Link>
      </div>
    );
  }
}

export default RecipeDish;
