import { ReactNode } from 'react';
import './FormField.css';

interface FormFieldProps {
  label?: string;
  children: ReactNode;
  description?: string;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
}

export default function FormField({
  label,
  children,
  description,
  className = '',
  labelClassName = '',
  descriptionClassName = ''
}: FormFieldProps) {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label className={`form-field-label ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className="form-field-content">
        {children}
      </div>
      {description && (
        <p className={`form-field-description ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
}