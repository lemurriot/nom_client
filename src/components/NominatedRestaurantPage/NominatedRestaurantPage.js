import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Comments from '../Comments/Comments'
import './NominatedRestaurantPage.css'
import NomsContext from '../../NomsContext'

export default function NominatedRestaurantPage(props) {
    return (
        <NomsContext.Consumer>
            {(context) => {
                const { food_category, restaurant_id } = props.match.params 
                const restaurantInfoContainer = context.nominated_restaurants.find(restaurant => restaurant.id === restaurant_id && restaurant.food_category === food_category)
                
                let restaurantInfo
                restaurantInfoContainer ? restaurantInfo = restaurantInfoContainer : restaurantInfo = {"id": "fake-id", "name": "", "date_nominated": "1970-01-01", "food_category": '', 'likes_table': "1"}
                const { name, date_nominated, likes_table, food_category: category  } = restaurantInfo
    
                let likesCount
                context.likes_and_comments[likes_table] ? likesCount = context.likes_and_comments[likes_table].liked_by.length : likesCount = 0

                let comments
                context.likes_and_comments[likes_table] ? comments = context.likes_and_comments[likes_table].liked_by.map((like, i) => <Comments key={i} comment={like.comment} username={context.users[like.user].username || "You"}/>) : comments = 'Ho Ho'
  
                return (
                    <>
                    <Header
                        {...props}
                        loggedIn={props.loggedIn}
                        onLogout={props.onLogout}
                    />
                        <main className="restaurant-page-main-container">
                            <h2>{name}</h2>
                            <p><span className="restaurant-page-label">Nominated for Best {category} on: </span>{new Date(date_nominated).toDateString()}</p>
                            <p><span className="restaurant-page-label">Current Votes: </span> {likesCount}</p>
                            <section className="comment-section">
                                <h3>Comments</h3>
                                {comments}
                            </section>
                        </main>
                    <Footer />
                    </>
                );
            }}
        </NomsContext.Consumer>
    )

}
