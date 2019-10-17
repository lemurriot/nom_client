import React from 'react'
import './ReviewPreview.css'
import NominatedRestaurant from '../NominatedRestaurant/NominatedRestaurant'

export default function ReviewPreview(props) {
	const RestaurantList = props.noms.map((nom, i) => (
		<NominatedRestaurant
            key={i}
            id={nom.id}
            name={nom.name}
            loggedIn={props.loggedIn}
			likesComments={props.likesComments[nom.id]}
		/>
	))
	return (
		<section className='category-card'>
			<h3>{props.title}</h3>
			<div className='restaurant-review-preview-box'>
				{RestaurantList}
			</div>
		</section>
	)
}
