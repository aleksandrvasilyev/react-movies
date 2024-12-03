import { createContext, useState, useContext } from "react";

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addHistory = (movie) => {
    if (!history.some((element) => element.id === movie.id)) {
      setHistory([...history, movie]);
    }
  };

  return (
    <HistoryContext.Provider value={{ history, setHistory, addHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
