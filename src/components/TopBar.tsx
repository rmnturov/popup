import { LayerMode } from './types';
import './TopBar.css';

interface TopBarProps {
  layerMode: LayerMode;
  className?: string;
}

export default function TopBar({ layerMode, className = '' }: TopBarProps) {
  return (
    <div 
      className={`top-bar ${layerMode === 'top' ? 'top-bar-top-layer' : 'top-bar-normal-layer'} ${className}`}
    >
      <h1 className="top-bar-title">Sticky Header</h1>
      <p className="top-bar-subtitle">This header stays at the top while scrolling</p>
    </div>
  );
}