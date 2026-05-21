import './Sidebar.css';

interface SidebarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function Sidebar({ darkMode, setDarkMode }: SidebarProps) {
  const buttons = [
    { id: 'home', icon: '🏠', title: 'Home' },
    { id: 'search', icon: '🔍', title: 'Search' },
    { id: 'add', icon: '➕', title: 'Add' },
    { id: 'profile', icon: '👤', title: 'Profile' },
    { id: 'settings', icon: '⚙️', title: 'Settings' },
  ];

  return (
      <div className={`sidebar ${darkMode ? 'dark-sidebar' : ''}`}>
        <div className="sidebar-top">
          {buttons.map((btn) => (
              <button
                  key={btn.id}
                  className="sidebar-btn"
                  title={btn.title}
                  onClick={() => {}}
              >
                {btn.icon}
              </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <button
              className="theme-toggle-btn"
              title="Přepnout motiv"
              onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
  );
}