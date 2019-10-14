import React from 'react'
import { Link } from 'react-router-dom'
import './AddRestaurantForm.css'

export default function AddRestaurantForm() {
    return (
        <main>
            <section className="form-modal">
                <div className="brand">
                    <span className="logo">★</span>
                    <h1>NomsPDX</h1>
                </div>
                <form>
                        <div className="container">
                            <h2>Nominate a Restaurant for Best in Category!</h2>
                            <label htmlFor="food-category">Category (required)</label>
                            <select name="food-category" id="food-category">
                                <option value="burger">Burger</option>
                                <option value="burrito">Burrito</option>
                                <option value="falafel">Falafel</option>
                            </select>
                            <label htmlFor="restaurant-name">Restaurant Name (required)</label>
                            <input type="text" name="restaurant-name" required/>

                            {/* <label htmlFor="name">Item Name (required)</label>
                          <input type="text" placeholder="Enter Food Item Name" name="name" required /> */}
                      
                          {/* <label htmlFor="item-rating">Your Rating:</label>
                          <select name="item-rating" id="item-rating">
                              <option value="1">1 Noms</option>
                              <option value="2">2 Noms</option>
                              <option value="3">3 Noms</option>
                              <option value="4">4 Noms</option>
                              <option value="5" selected>5 Noms</option>
                          </select> */}

                          <label htmlFor="comment">Comment (optional)</label>
                          <textarea name="item-comment" id="item-comment" placeholder="Enter Item comment"></textarea>
                          
                          {/* <fieldset>
                                <legend>Is this a public or private review?</legend>
                                <input id="public" type="radio" name="public-private" value="public" required />
                                <label htmlFor="public">public</label><br />
                                <input id="private" type="radio" name="public-private" value="private" />
                                <label htmlFor="private">private</label><br />
                          </fieldset> */}
                        </div>
                        <div className="buttons">
                        <Link to="/my-reviews"><button className="cxl-btn">
                                Cancel
                            </button></Link>
                            <button className="submit-btn">
                                Submit
                            </button>
                        </div>
                      </form>             
            </section>
        </main>
    )
}
