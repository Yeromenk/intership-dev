import { useState, useEffect } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { DataTable } from '../DataTable/DataTable';
import { Sidebar } from '../Sidebar/Sidebar';
import './App.css';

function App() {
    const { data } = useFetchData();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [darkMode]);

    return (
        <div className={`app-container ${darkMode ? 'dark-theme-app' : ''}`}>
            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className="main-container">
                <DataTable data={data} darkMode={darkMode} />
            </div>
        </div>
    );
}

export default App;