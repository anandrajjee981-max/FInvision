import React, { createContext, useEffect, useState } from 'react';

export const Userdatacontext = createContext();

const UserContext = (props) => {
  const [expense, setexpense] = useState("");
  const [classify, setclassify] = useState("");
 const [target, settarget] = useState(() => {
  return Number(localStorage.getItem("target")) || 0;
});

useEffect(() => {
  localStorage.setItem("target", target);
}, [target]);
 

 const [stored, setstored] = useState(() => {
  try {
    const data = localStorage.getItem("expenses");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
});

  function addmanually() {
    const amount = parseFloat(expense);
    if (!amount || !classify) return;

    setstored(prev => [
      ...prev,
      {
        id: Date.now(),
        expense: amount,
        classify: classify
      }
    ]);

    setexpense("");
    setclassify("");
  }
  useEffect(()=>{
    
localStorage.setItem("expenses", JSON.stringify(stored))

  },[stored])  
  useEffect(() => {
  const last = localStorage.getItem("lastReset");
  const today = new Date().toDateString();

  if (last !== today) {
    settarget(0);
    localStorage.setItem("lastReset", today);
  }
}, []);

  return (
    <Userdatacontext.Provider
      value={{
        expense,
        setexpense,
        classify,
        setclassify,
        stored,
        addmanually , 
        target , 
        settarget
      }}
    >
      {props.children}
    </Userdatacontext.Provider>
  );
};

export default UserContext;