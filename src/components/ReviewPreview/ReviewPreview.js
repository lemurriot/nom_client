import React from 'react'
import './ReviewPreview.css'
import NominatedRestaurantPreview from '../NominatedRestaurant/NominatedRestaurantPreview'

export default function ReviewPreview(props) {
	const RestaurantList = props.noms.map((nom, i) => (
		<NominatedRestaurantPreview
			key={i}
			id={nom.id}
			category={nom.food_category}
            name={nom.name}
            loggedIn={props.loggedIn}
			likesComments={props.likesComments[nom.id]}
		/>
	))
	return (
		<section className='category-card'>
			<h3>{props.category}</h3>
			<div className='restaurant-review-preview-box'>
				{RestaurantList}
			</div>
		</section>
	)
}
