import { useState, createContext, useEffect } from 'react';

export const SettingsContext = createContext();

function SettingsProvider(props) { 

  let [pagination, setPagination] = useState(3);
  let [sort, setSort] = useState('');
  let [display, setDisplay] = useState(false);
  let [error, setError] = useState(null);

  const updatePagination = (value) => {
    if (parseInt(value)) { 
      setPagination(value);
      setError(null);
      localStorage.setItem('settings', JSON.stringify({ pagination, sort, display }));
    } else {
      setError('No pagnation number');
    }
  }

  useEffect(() => {
    let savedSettings = localStorage.getItem('settings');
  }, []);

  return (
    <SettingsContext.Provider value={{ pagination, sort, display, updatePagination, settingsError: error, setError }}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;