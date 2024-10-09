import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function DefaultLayout({ children }) {
    return (
        <div>
            <Navigation />
            <div className='container'>
                <div className='content'>{children}</div>
            </div>
            <Footer />
        </div>
    )
}