import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function MyReviews(props) {
    return (
        <>
           <Header {...props} loggedIn={props.loggedIn} onLogout={props.onLogout}/>
            <main className="my-reviews-main-container">
                <Link to="/add-new-nom"><button className="add-new-nom btn">Nominate a New Restaurant!</button></Link>
                <section className="my-noms">

                </section>
                <section className="my-upvotes">

                </section>
            </main>
           <Footer />
        </>
    )
}
