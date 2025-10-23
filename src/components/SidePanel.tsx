import FormField from './FormField';
import { ScrollMode, LayerMode } from './types';
import './SidePanel.css';

interface SidePanelProps {
  scrollMode: ScrollMode;
  setScrollMode: (mode: ScrollMode) => void;
  layerMode: LayerMode;
  setLayerMode: (mode: LayerMode) => void;
  className?: string;
}

export default function SidePanel({
  scrollMode,
  setScrollMode,
  layerMode,
  setLayerMode,
  className = ''
}: SidePanelProps) {
  return (
    <div className={`side-panel ${className}`}>
      <h2 className="side-panel-title">Настройки</h2>

      <div className="side-panel-content">
        {/* Scroll Mode Setting */}
        <FormField label="Выпадающее окно">
          <div className="side-panel-radio-group">
            <label className="side-panel-radio-item">
              <input
                type="radio"
                checked={scrollMode === 'native'}
                onChange={() => setScrollMode('native')}
                className="side-panel-radio-input"
              />
              <span className="side-panel-radio-label">1. Движется вместе со страницей</span>
            </label>
            <label className="side-panel-radio-item">
              <input
                type="radio"
                checked={scrollMode === 'fixed'}
                onChange={() => setScrollMode('fixed')}
                className="side-panel-radio-input"
              />
              <span className="side-panel-radio-label">2. Блокирует прокрутку</span>
            </label>
            <label className="side-panel-radio-item">
              <input
                type="radio"
                checked={scrollMode === 'close-on-scroll'}
                onChange={() => setScrollMode('close-on-scroll')}
                className="side-panel-radio-input"
              />
              <span className="side-panel-radio-label">3. Закрывается при прокрутке</span>
            </label>
            <label className="side-panel-radio-item">
              <input
                type="radio"
                checked={scrollMode === 'hide-out-of-view'}
                onChange={() => setScrollMode('hide-out-of-view')}
                className="side-panel-radio-input"
              />
              <span className="side-panel-radio-label">4. Пропадает при выходе за видимую область</span>
            </label>
            <label className="side-panel-radio-item">
              <input
                type="radio"
                checked={scrollMode === 'hide-reopen'}
                onChange={() => setScrollMode('hide-reopen')}
                className="side-panel-radio-input"
              />
              <span className="side-panel-radio-label">5. Пропадает при выходе и открывается снова при возврате в видимую область</span>
            </label>
          </div>
        </FormField>

        {/* Layer Mode Setting */}
        <div className="side-panel-section">
          <FormField label="Наслоение">
            <div className="side-panel-radio-group">
              <label className="side-panel-radio-item">
                <input
                  type="radio"
                  checked={layerMode === 'top'}
                  onChange={() => setLayerMode('top')}
                  className="side-panel-radio-input"
                />
                <span className="side-panel-radio-label">Располагается под шапкой</span>
              </label>
              <label className="side-panel-radio-item">
                <input
                  type="radio"
                  checked={layerMode === 'normal'}
                  onChange={() => setLayerMode('normal')}
                  className="side-panel-radio-input"
                />
                <span className="side-panel-radio-label">Поверх всех</span>
              </label>
            </div>
          </FormField>
        </div>

      </div>
    </div>
  );
}