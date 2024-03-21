import './Header.scss';
import gradient from '../../assets/images/pastel-gradient.png'


export default function Header() {

    return (
        <div className='header'>
            <img src={gradient} className='header__gradient' alt='gradient' />
            <div className='header__title'></div>
        </div>
    )
}