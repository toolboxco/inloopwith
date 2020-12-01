import TestimonialCard from './testimonial-card';
import styles from '../../styles/testimonials.module.scss';

const Testimonials = () => {
    return (
        <section className={styles.testimonials}>
            <h2>We&apos;re only 1 month old 🎂</h2>
            <div className={styles.cardsWrapper}>
                <TestimonialCard
                    name="Pranav Ahuja"
                    img="pranav"
                    designation="CEO, Xeno"
                    testimonial="The laziest way to stay in the loop about the best product launches & the interesting startup discussions"
                />
                <TestimonialCard
                    name="Ekansh Bansal"
                    img="ekansh"
                    designation="Student, Final year Engineering "
                    testimonial="My habit of checking the phone first thing in the morning finally has a positive outcome!"
                />
                <TestimonialCard
                    name="David Karapetyan"
                    img="david"
                    designation="Software Engineer"
                    testimonial={
                        "It's a good mix of interesting links and products! I find this better on WhatsApp than on an email."
                    }
                />

                <TestimonialCard
                    name="Priyank Agrawal"
                    img="priyank"
                    designation="Cofounder at Cutshort"
                    testimonial="There's too much content & too little time. Inloopwith perfectly curates the most important stuff for me!"
                />
                <TestimonialCard
                    name="Mohit Chitlangia"
                    img="mohit"
                    designation="Director, Product at Jupiter"
                    testimonial={
                        "Can't think of a better way to deliver this! The headlines and the summary do the job so well."
                    }
                />
                <TestimonialCard
                    name="Rohit Jindal"
                    img="rohit"
                    designation="Senior Software Engineer, Flipkart"
                    testimonial={
                        "To the point! It's a morning coffee refresher for me"
                    }
                />
                <TestimonialCard
                    name="Praveen Kumar"
                    img="praveen"
                    designation="Founder at apnerve labs"
                    testimonial={
                        'I kinda start my day with it. It sets me into the "zone" easily'
                    }
                />
                <TestimonialCard
                    name="Himanshu Dixit"
                    img="himanshu"
                    designation="Hacker, headout, crusher.dev"
                    testimonial="Saves me full 30mins of random every day stumbling on PH and HN!"
                />
            </div>
        </section>
    );
};

export default Testimonials;
