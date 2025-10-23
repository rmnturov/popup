import { useState } from 'react';
import Select from './components/Select';
import { ScrollMode, LayerMode } from './components/types';
import TopBar from './components/TopBar';
import SidePanel from './components/SidePanel';
import './App.css';

const OPTIONS = [
  'Cadbury',
  'Dove',
  'Ferrero Rocher',
  'Godiva',
  'Hershey\'s',
  'Kit Kat',
  'Lindt',
  'Mars',
  'Milka',
  'M&M\'s',
  'Nestlé',
  'Reese\'s',
  'Snickers',
  'Toblerone',
  'Twix',
];

function App() {
  const [selectedOption, setSelectedOption] = useState('Select a chocolate brand');
  const [scrollMode, setScrollMode] = useState<ScrollMode>('native');
  const [layerMode, setLayerMode] = useState<LayerMode>('top');

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="app">
      <div className="app-container">
        {/* Left Content Section */}
        <div className="app-content">
          {/* Sticky Header */}
          <TopBar layerMode={layerMode} />

          {/* Content */}
          <div className="app-main-content">
            <div className="app-content-section">
              <div className="app-card">
                <h2 className="app-title">Introduction</h2>
                <p className="app-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

              <div className="app-card-white">
                <h2 className="app-title-white">Content Section</h2>
                <p className="app-text-white">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              <div className="app-card-white">
                <h2 className="app-title-white">More Content</h2>
                <p className="app-text-white">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                  eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>

              {/* Select Component */}
              <div className="app-card select-card">
                <h2 className="app-title">Select</h2>
                <Select
                  options={OPTIONS}
                  selectedOption={selectedOption}
                  onSelectOption={handleSelectOption}
                  scrollMode={scrollMode}
                  layerMode={layerMode}
                  placeholder="Select a chocolate brand"
                />
              </div>

              <div className="app-card-white">
                <h2 className="app-title-white">Additional Content</h2>
                <p className="app-text-white">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                  eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                </p>
              </div>

              <div className="app-card-white">
                <h2 className="app-title-white">More Paragraphs</h2>
                <p className="app-text-white app-text-margin">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                  quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                </p>
                <p className="app-text-white">
                  Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                  facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.
                </p>
              </div>
              <div className="app-card-white">
                <h2 className="app-title-white">More Paragraphs</h2>
                <p className="app-text-white app-text-margin">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                  quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                </p>
                <p className="app-text-white">
                  Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                  facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.
                </p>
              </div>
              <div className="app-card-white">
                <h2 className="app-title-white">More Paragraphs</h2>
                <p className="app-text-white app-text-margin">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                  quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                </p>
                <p className="app-text-white">
                  Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                  facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.
                </p>
              </div>
              <div className="app-card-white">
                <h2 className="app-title-white">More Paragraphs</h2>
                <p className="app-text-white app-text-margin">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                  quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                </p>
                <p className="app-text-white">
                  Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                  facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.
                </p>
              </div>

              <div className="app-card-white">
                <h2 className="app-title-white">Final Section</h2>
                <p className="app-text-white">
                  Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae
                  sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Settings Panel */}
        <SidePanel
          scrollMode={scrollMode}
          setScrollMode={setScrollMode}
          layerMode={layerMode}
          setLayerMode={setLayerMode}
        />
      </div>
    </div>
  );
}

export default App;