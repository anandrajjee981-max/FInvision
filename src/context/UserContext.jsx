import React, { createContext, useState } from 'react';

export const Userdatacontext = createContext();

const UserContext = (props) => {
  const [expense, setexpense] = useState("");
  const [classify, setclassify] = useState("");
  const [stored, setstored] = useState([]);

  function addmanually(e) {
    e.preventDefault();

    if (!expense || !classify) return;

    setstored(prev => [
      ...prev,
      {
        expense: Number(expense),
        classify: classify
      }
    ]);

    setexpense("");
    setclassify("");
  }

  return (
    <Userdatacontext.Provider
      value={{
        expense,
        setexpense,
        classify,
        setclassify,
        stored,
        addmanually
      }}
    >
      {props.children}
    </Userdatacontext.Provider>
  );
};

export default UserContext;