
import { useState } from "react";

function App() {
  const [form, setForm] = useState ({
    amount: 0,
    descrition: "",
    date: "",
  });
  async function handleSubmit(e){
    e.preventDefault();
    const res = await fetch('http://localhost:4000/transaction' ,{ method: "POST",
    body:form,});
    console.log(res);
  }
  function handleInput(e){
    setForm({ ...form,[e.target.name]: e.target.value});
  }
  return (
    <div>
     <form onSubmit={handleSubmit}> 

     <label>amount </label>  

      <input type= "number" 
          name= "amount"
          value={form.amount}
          onChange={handleInput}  
          placeholder="Enter transtion amount"
      /> 

      <label>Description </label> 
      <input type= "text" 
         name = "descrition"
         value={form.descrition} 
         onChange={handleInput} 
         placeholder="Enter transtion descrition"
      />  

      <label>date </label> 

      <input type= "date" 
         name = "date"
         value={form.date}
         onChange={handleInput}  
      />  

      <button type="submit">Submit</button>

     </form>
    </div>
  );
}

export default App;
