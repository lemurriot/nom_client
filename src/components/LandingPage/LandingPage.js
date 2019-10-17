import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ReviewPreview from '../ReviewPreview/ReviewPreview'
import './LandingPage.css'

export default function LandingPage(props) {
	const arrFromCategories = props.nominated_restaurants.map(
		nom => nom.food_category,
	)

	const uniqueCategories = new Set(arrFromCategories)

	const filteredCategoryReviews = [...uniqueCategories].map(cat =>
		props.nominated_restaurants.filter(nom => nom.food_category === cat),
	)
	const reviewPreviewList = filteredCategoryReviews.map((cat, i) => (
		<ReviewPreview
			key={i}
			likesComments={props.likesComments}
			noms={cat}
			title={[...uniqueCategories][i]}
			loggedIn={props.loggedIn}
		/>
	))

	return (
		<>
			<Header
				{...props}
				loggedIn={props.loggedIn}
				onLogout={props.onLogout}
			/>
			<main className='landing-page-main-container'>
			<Link to="/add-new-nom"><button className="add-new-nom btn">Nominate a New Restaurant!</button></Link>
				{reviewPreviewList}
			</main>
			<Footer />
		</>
	)
}
