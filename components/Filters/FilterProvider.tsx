import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<any>({});

// Hook to provide access to context object
export const useFilterProvider = () => {
  return useContext(AppContext);
};

export const FilterProvider = ({ filters, children }) => {
  const { versions, customRange } = filters;
  const [daysAgo, lastDate] = customRange;
  const [from, setFrom] = useState(daysAgo);
  const [to, setTo] = useState(lastDate);
  const [versionsSelected, setVersionsSelected] = useState(versions);

  // Assign React state and constants to context object
  const context = {
    from,
    to,
    setFrom,
    setTo,
    versionsSelected,
    versions,
    setVersionsSelected,
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
