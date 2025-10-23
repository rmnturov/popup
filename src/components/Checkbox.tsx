import './Checkbox.css';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export default function Checkbox({
  checked,
  onChange,
  disabled = false,
  label,
  className = '',
  inputClassName = '',
  labelClassName = ''
}: CheckboxProps) {
  return (
    <label className={`checkbox ${disabled ? 'checkbox-disabled' : ''} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={`checkbox-input ${inputClassName}`}
      />
      {label && (
        <span className={`checkbox-label ${disabled ? 'checkbox-label-disabled' : ''} ${labelClassName}`}>
          {label}
        </span>
      )}
    </label>
  );
}