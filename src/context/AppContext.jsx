import React, { createContext, useState } from "react";


export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [topicList, setTopics] = useState([]); 
  const [questions, setQuestions] = useState([]); 
  const [adminLogin ,setAdminLogin]=useState(false)
  const [mobileView,setMobileView]=useState(false)

  const value = {
    topicList,setTopics,
    questions,setQuestions,
    adminLogin,setAdminLogin,
    mobileView,setMobileView
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
