import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const InitialForm = {
  amount: Number,
  description: String,
  date:new Date(),
};

export default function TransactionForm({ fetchTransactions, editTransactions}) {
  const [form, setForm] = useState(InitialForm);

  React.useEffect(() =>{
    if(editTransactions.amount !== undefined ){
    setForm(editTransactions);
  console.log(editTransactions);}
  }, [editTransactions])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  async function handleSubmit(e) {
    e.preventDefault();
     editTransactions.amount === undefined ? create(): update()
    }

    function reload(res){
        if (res.ok) {
            setForm(InitialForm);
            fetchTransactions();}
    }
    async function update(){
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransactions._id}`, {
            method: "PATCH",
            body: JSON.stringify(form),
            headers: {
              "content-type": "application/json",
            },
          });
         reload(res);
         window.location.reload()
          }
    async function create(){
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
              "content-type": "application/json"
            }
          });
         reload(res);
          }


  return (
    
      <Card sx={{ minWidth: 275, marginTop: 10 }}>
        <CardContent>
          <Typography variant="h6">Add New Transaction</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ marginRight: 5 }}
              id="outlined-basic"
              size="small"
              label="Amount"
              variant="outlined"
              value={form.amount}
              onChange={handleChange}
              name="amount"
            />
            <TextField
              sx={{ marginRight: 5 }}
              id="outlined-basic"
              size="small"
              label="Description"
              variant="outlined"
              value={form.description}
              onChange={handleChange}
              name="description"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                size="small"
                label="Transaction Date "
                inputFormat="MM/DD/YYYY"
                value={form.date}
                name="date"
                onChange={handleDate}
                renderInput={(params) => (
                  <TextField sx={{ marginRight: 5 }} size="small" {...params} />
                )}
              />
            </LocalizationProvider>
            {
               editTransactions.amount !== undefined && 
            (<Button type="submit" variant="secondery">
                Update
            </Button>)
            }
            {
                editTransactions.amount === undefined && (
            <Button type="submit" variant="contained">
              Submit
              </Button> ) 
            }
          </form>
        </CardContent>
      </Card>
   
  );
}
