import React, { Component } from "react";
import config from "../../config";

export default class SearchRestaurantsForm extends Component {
  componentDidMount() {
    fetch(config.RESTAURANT_ENDPOINT, {
      method: "GET",
      headers: {
        "user-key": `${config.RESTAURANT_API_KEY}`
      }
    })
      .then(res => {
        console.log(res);
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return <section>RestaurantsForm</section>;
  }
}
