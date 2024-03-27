import "./Input.scss";

export default function Input({ label, name, type, value, onChange, placeholder, error }) {
    return (
        <div className="input">
            <label htmlFor={name} className="input__label">
                {label}
            </label>
            <input
                type={type}
                id={name}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className="input__input"
            />
            {error && <div className="input__error">{error}</div>}

        </div>
    );
}