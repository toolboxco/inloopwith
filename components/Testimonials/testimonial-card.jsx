import styles from '../../styles/testimonials.module.scss';

const isProd = process.env.NODE_ENV === 'production';

const TestimonialCard = ({ name, designation, testimonial, img }) => (
    <div className={styles.card}>
        <img
            src={`${
                isProd ? 'https://toolboxco.imgix.net' : ''
            }/static/img/testimonials/${img}.png${isProd ? '?w=80' : ''}`}
            alt={name}
        />
        <h3>{name}</h3>
        <sub>{designation}</sub>
        <i>"{testimonial}"</i>
    </div>
);

export default TestimonialCard;
