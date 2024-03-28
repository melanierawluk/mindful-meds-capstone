import './Frame.scss';
import frame from '../../assets/images/iphone-frame.png'

export default function Frame() {
    return (
        <div className="frame">
            <img src={frame} alt="iPhone Frame" className="frame__image" />
        </div>
    );
}