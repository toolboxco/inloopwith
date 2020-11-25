import styles from '../../styles/testimonials.module.scss';

const TestimonialCard = ({ name, designation, testimonial, img }) => (
    <div className={styles.card}>
        <img src={`/static/img/testimonials/${img}.png`} alt={name} />
        <h3>{name}</h3>
        <sub>{designation}</sub>
        <i>"{testimonial}"</i>
    </div>
);

export default TestimonialCard;
