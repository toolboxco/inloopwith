import TestimonialCard from './testimonial-card';
import styles from '../../styles/testimonials.module.scss';

const Testimonials = () => {
    return (
        <section className={styles.testimonials}>
            <h2>What People are saying</h2>
            <div className={styles.cardsWrapper}>
                <TestimonialCard
                    name={'Pranav Ahuja'}
                    img={'pranav'}
                    designation={'CEO, Xeno'}
                    testimonial={
                        'The laziest way to stay in the loop about the best product launches & the interesting startup discussions'
                    }
                />
                <TestimonialCard
                    name={'Ekansh Bansal'}
                    img={'ekansh'}
                    designation={'4th year B.Tech IIIT-A'}
                    testimonial={
                        'My habit of checking the phone first thing in the morning finally has a positive outcome!'
                    }
                />
                <TestimonialCard
                    name={'Mohit Chitlangia'}
                    img={'mohit'}
                    designation={'Director of Product Management, Jupiter'}
                    testimonial={
                        "I love PH updates. I don't consume a lot of Hacker News - but the headlines and the summary do the job. Can't think of a better way to deliver this!"
                    }
                />
                <TestimonialCard
                    name={'Rohit Jindal,'}
                    img={'rohit'}
                    designation={'Senior Software Engineer, Flipkart'}
                    testimonial={
                        "To the point! It's a morning coffee refresher for me"
                    }
                />
            </div>
        </section>
    );
};

export default Testimonials;
