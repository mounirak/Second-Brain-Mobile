import { createContext, useState } from "react";

export const TodosContext = createContext({
  tasks: [],
  setTasks: () => {}
});

export const TodosProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
  ]);

  return (
    <TodosContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TodosContext.Provider>
  );
};