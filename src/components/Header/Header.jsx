import './Header.scss';
import gradient from '../../assets/images/pastel-gradient.png'


export default function Header({ title }) {

    return (
        <div className='header'>
            <img src={gradient} className='header__gradient' alt='gradient' />
            <h2 className='header__title'>{title}</h2>
        </div>
    )
}