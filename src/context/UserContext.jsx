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
      const data = JSON.parse(localStorage.getItem("expenses"));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  });


  function addmanually() {
    const amount = parseFloat(expense);

  
    if (isNaN(amount) || amount <= 0 || !classify.trim()) return;

    setstored(prev => [
      ...prev,
      {
        id: Date.now(), // unique id
        date: new Date().toISOString(), 
        expense: amount,
        classify: classify.trim()
      }
    ]);

    setexpense("");
    setclassify("");
  }

  const deleteit = (id) => {
    setstored(prev => prev.filter(item => item.id !== id));
  };


 useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(stored));
  }, [stored]);


  useEffect(() => {
    const last = localStorage.getItem("lastReset");
    const today = new Date().toISOString().split("T")[0];

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
        addmanually,
        deleteit,
        target,
        settarget
      }}
    >
      {props.children}
    </Userdatacontext.Provider>
  );
};

export default UserContext;