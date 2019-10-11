import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ReviewPreview from '../ReviewPreview/ReviewPreview'

export default function LandingPage(props) {
    const arrFromCategories = props.reviews.map(review => review.food_category)

    const uniqueCategories = new Set(arrFromCategories)

    const filteredCategoryReviews = [...uniqueCategories].map(cat => props.reviews.filter(rev => rev.food_category === cat))
    const reviewPreviewList = filteredCategoryReviews.map((cat, i) => 
     <ReviewPreview key={i} reviews={cat} title={[...uniqueCategories][i]}/>)
  
 
    return (
        <>
            <Header />  
                <main className="landing-page-main-container">
                    {reviewPreviewList}
                </main>
            <Footer />
        </>
    );
}