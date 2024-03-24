import "./Input.scss";

export default function Input({ label, name, type, value, onChange }) {
    return (
        <div className="field">
            <label htmlFor={name} className="field__label">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="field__input"
            />
        </div>
    );
}