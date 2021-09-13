import React from "react";
import styles from "./InputDish.module.css";

class InputDish extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dish: ""
    };
  }

  inputChangeHandler = (event) => {
    this.setState({
      dish: event.target.value
    });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.dish.trim()) {
      // console.log(this.state.dish);
      this.props.searchHandler(this.state.dish);
      this.setState({
        dish: ""
      });
    } else {
      alert("Please Input a dish");
    }
  };

  render() {
    return (
      <form onSubmit={this.formSubmitHandler}>
        <input
          type="text"
          placeholder="Search Dish"
          value={this.state.dish}
          onChange={this.inputChangeHandler}
          className={styles.input}
        />
        <button className={styles.button}>Search</button>
      </form>
    );
  }
}

export default InputDish;
