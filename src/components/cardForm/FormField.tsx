import { ChangeEvent } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  options?: { value: string; label: string }[];
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type, value, onChange, error, options, ...props }) => {
    return (
      <label className="card-form__label" htmlFor={name}>
        {label}
        {type === 'select' ? (
          <select
            className="card-form__select"
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            {...props}
          >
            <option value=""></option>
            {options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="card-form__input"
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            {...props}
          />
        )}
        {error && (
          <span className="error-message">{error}</span>
        )}
      </label>
    );
  };

export default FormField;