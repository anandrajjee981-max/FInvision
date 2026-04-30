import React, { createContext, useState } from 'react'
export const Userdatacontext = createContext()

const UserContext = (props) => {
    const [expense, setexpense] = useState();
    const [classify, setclassify] = useState();
    const [stored, setstored] = useState([]);

const [expense, setexpense] = useState("");
const [classify, setclassify] = useState("");
const [stored, setstored] = useState([]);

function addmanually(e) {
  e.preventDefault();

  if (!expense || !classify) return;

  const newItem = {
    expense: Number(expense),
    classify
  };

  setstored(prev => [...prev, newItem]);

  setexpense("");
  setclassify("");
}

  return (
<Userdatacontext.Provider
  value={{
    expense,
    classify,
    stored,
    setexpense,
    setclassify,
    addmanually
  }}
>

{props.children}
   </Userdatacontext.Provider>
  )
}

export default UserContext
