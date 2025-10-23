import './Option.css';

interface OptionProps {
  option: string;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}

export default function Option({ option, isSelected, onSelect, className = '' }: OptionProps) {
  return (
    <button
      onClick={onSelect}
      className={`option ${isSelected ? 'option-selected' : 'option-default'} ${className}`}
    >
      <div className="inner">
        {option}
      </div>
    </button>
  );
}