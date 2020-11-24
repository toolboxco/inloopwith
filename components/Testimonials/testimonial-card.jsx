import styles from '../../styles/testimonials.module.scss';

const TestimonialCard = ({ name, designation, testimonial, img }) => (
    <div className={styles.card}>
        <img src={`/static/img/testimonials/${img}.png`} alt="Pranav Ahuja" />
        <h3>{name}</h3>
        <sub>{designation}</sub>
        <p>"{testimonial}"</p>
    </div>
);

export default TestimonialCard;
