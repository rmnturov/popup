import { useState, useRef, useEffect } from 'react';
import Popup from './Popup.tsx';
import Option from './Option.tsx';
import { ScrollMode, LayerMode } from './types';
import './Select.css';

// ChevronDownS16 icon component from @koobiq/icons
const ChevronDownS16 = ({ className }: { className?: string }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    className={className}
    fill="currentColor"
  >
    <path d="m8 8.85 3.809-3.722a.203.203 0 0 1 .285 0l.845.83c.081.08.081.21 0 .29L8.142 10.94a.203.203 0 0 1-.284 0L3.06 6.248a.2.2 0 0 1 0-.29l.846-.83a.203.203 0 0 1 .284 0z"/>
  </svg>
);

export interface SelectProps {
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
  scrollMode: ScrollMode;
  layerMode: LayerMode;
  placeholder?: string;
  className?: string;
}

export default function Select({
  options,
  selectedOption,
  onSelectOption,
  scrollMode,
  layerMode,
  placeholder = 'Select an option',
  className = ''
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [wasClosedByOutOfView, setWasClosedByOutOfView] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Функция для плавного закрытия
  const closeWithAnimation = () => {
    if (isExiting) return;
    
    setIsExiting(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsExiting(false);
    }, 150); // Время должно совпадать с CSS анимацией
  };

  // Обработка прокрутки в зависимости от режима
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = (event: Event) => {
      if (scrollMode === 'close-on-scroll') {
        // Проверяем, происходит ли скролл внутри выпадающего меню
        const target = event.target as Element;
        const isInsideDropdown = dropdownRef.current && dropdownRef.current.contains(target);
        
        // Закрывать только при скролле страницы, не внутри выпадашки
        if (!isInsideDropdown) {
          setWasClosedByOutOfView(false);
          closeWithAnimation();
        }
        return;
      }

      if (scrollMode === 'hide-out-of-view' || scrollMode === 'hide-reopen') {
        // Проверяем, вышел ли select за видимую область
        if (selectRef.current) {
          const rect = selectRef.current.getBoundingClientRect();
          const isOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;

          if (isOutOfView) {
            setWasClosedByOutOfView(scrollMode === 'hide-reopen');
            closeWithAnimation();
          }
        }
        return;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (scrollMode === 'close-on-scroll') {
        // Проверяем, происходит ли скролл внутри выпадающего меню
        const target = event.target as Element;
        const isInsideDropdown = dropdownRef.current && dropdownRef.current.contains(target);
        
        // Закрывать только при скролле страницы колесиком мыши, не внутри выпадашки
        if (!isInsideDropdown) {
          setWasClosedByOutOfView(false);
          closeWithAnimation();
        }
        return;
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('wheel', handleWheel, true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('wheel', handleWheel, true);
    };
  }, [isOpen, scrollMode, isExiting]);

  // Логика для автоматического открытия при возврате в видимую область
  useEffect(() => {
    if (!wasClosedByOutOfView || isOpen || isExiting || scrollMode !== 'hide-reopen') return;

    const handleScrollForReopen = () => {
      if (selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();
        const isInView = rect.bottom >= 0 && rect.top <= window.innerHeight;

        if (isInView) {
          setWasClosedByOutOfView(false);
          setIsOpen(true);
        }
      }
    };

    window.addEventListener('scroll', handleScrollForReopen, true);
    return () => window.removeEventListener('scroll', handleScrollForReopen, true);
  }, [wasClosedByOutOfView, isOpen, isExiting, scrollMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setWasClosedByOutOfView(false);
        closeWithAnimation();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isExiting]);

  // Block page scroll when popup is open and scrollMode is fixed
  useEffect(() => {
    if (isOpen && scrollMode === 'fixed') {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Calculate scrollbar width to maintain layout
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Prevent body scroll while keeping scrollbar visible
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Keep scrollbar visible but prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Create a more comprehensive approach to prevent scrolling
      const preventPageScroll = (e: Event) => {
        // Check if the scroll event is happening inside the popup
        const target = e.target as Element;
        const isInsidePopup = dropdownRef.current && dropdownRef.current.contains(target);
        
        // Always prevent page scroll when popup is open in fixed mode
        if (!isInsidePopup) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        
        // Allow scrolling inside popup, but prevent it from bubbling to page
        if (isInsidePopup) {
          // Let the popup handle its own scrolling
          e.stopPropagation();
          return true;
        }
      };
      
      // Add event listeners to prevent page scrolling
      document.addEventListener('wheel', preventPageScroll, { passive: false });
      document.addEventListener('touchmove', preventPageScroll, { passive: false });
      document.addEventListener('keydown', (e) => {
        // Block scroll-related keys
        const target = e.target as Element;
        const isInsidePopup = dropdownRef.current && dropdownRef.current.contains(target);
        
        if (!isInsidePopup && [32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
          e.preventDefault();
        }
      });
      
      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        
        // Remove event listeners
        document.removeEventListener('wheel', preventPageScroll);
        document.removeEventListener('touchmove', preventPageScroll);
        document.removeEventListener('keydown', (e) => {
          const target = e.target as Element;
          const isInsidePopup = dropdownRef.current && dropdownRef.current.contains(target);
          
          if (!isInsidePopup && [32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
            e.preventDefault();
          }
        });
        
        // Restore scroll position without causing visual jump
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
      };
    }
  }, [isOpen, scrollMode]);

  // Handle Escape key to close popup and return focus
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setWasClosedByOutOfView(false);
        closeWithAnimation();
        // Return focus to the select button
        if (buttonRef.current) {
          buttonRef.current.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isExiting]);

  const handleSelectOption = (option: string) => {
    onSelectOption(option);
    setWasClosedByOutOfView(false);
    closeWithAnimation();
    // Return focus to the select button after selection
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  return (
    <div className={`select ${className}`} ref={selectRef}>
      <button
        ref={buttonRef}
        onClick={() => {
          setWasClosedByOutOfView(false);
          setIsOpen(!isOpen);
        }}
        className="select-button"
      >
        <span className="select-text">{selectedOption || placeholder}</span>
        <ChevronDownS16 className={`select-icon ${isOpen ? 'select-icon-open' : ''}`} />
      </button>

      {isOpen && (
        <Popup
          ref={dropdownRef}
          scrollMode={scrollMode}
          layerMode={layerMode}
          selectRef={selectRef}
          className={isExiting ? 'popup-exiting' : ''}
        >
          <div className="select-options">
            {options.map((option, index) => (
              <Option
                key={index}
                option={option}
                isSelected={option === selectedOption}
                onSelect={() => handleSelectOption(option)}
              />
            ))}
          </div>
        </Popup>
      )}
    </div>
  );
}