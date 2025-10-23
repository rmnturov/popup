import { forwardRef } from 'react';
import { ScrollMode, LayerMode } from './types';
import './Popup.css';

interface PopupProps {
  children: React.ReactNode;
  scrollMode: ScrollMode;
  layerMode: LayerMode;
  selectRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

const Popup = forwardRef<HTMLDivElement, PopupProps>(({
  children,
  scrollMode,
  layerMode,
  selectRef,
  className = ''
}, ref) => {
  const getPositionStyle = () => {
    if (scrollMode === 'fixed' && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + 4,
        left: rect.left,
        width: selectRef.current.offsetWidth,
      };
    }
    return {};
  };

  const getClassName = () => {
    const baseClass = 'popup';
    const positionClass = scrollMode === 'fixed' ? 'popup-fixed' : 'popup-absolute';
    const layerClass = layerMode === 'top' ? 'popup-top-layer' : 'popup-normal-layer';
    return `${baseClass} ${positionClass} ${layerClass} ${className}`;
  };

  return (
    <div
      ref={ref}
      className={getClassName()}
      style={getPositionStyle()}
    >
      {children}
    </div>
  );
});

Popup.displayName = 'Popup';

export default Popup;