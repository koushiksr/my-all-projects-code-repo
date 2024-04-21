import React from "react";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";
function App() {
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
  }
  return (
    <div>
      <h1 className="text-red500">Form</h1>
      <h2 className="text-blue-500">form</h2>
      <form
        action="handlesubmit"
        method="post"
        onSubmit={handleSubmit}
        className=""
      >
        <Input
          type="text"
          name="name"
          id="name"
          aria-label="name"
          placeholder="name"
          required
        />
        <Input
          type="email"
          name="email"
          id="email"
          aria-label="email"
          placeholder="email"
          required
        />
        <Input
          type="password"
          name="password"
          id="password"
          aria-label="password"
          placeholder="password"
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button type="reset" variant="contained" color="secondary">
          Reset
        </Button>

        <Input
          type="file"
          name="file"
          id="file"
          aria-label="file"
          placeholder="file"
        />
        <Input
          type="date"
          name="date"
          id="date"
          aria-label="date"
          placeholder="date"
        />
        <Input
          type="time"
          name="time"
          id="time"
          aria-label="time"
          placeholder="time"
        />
        <Input
          type="datetime-local"
          name="datetime-local"
          id="datetime-local"
          aria-label="datetime-local"
          placeholder="datetime-local"
        />
        <Input
          type="week"
          name="week"
          id="week"
          aria-label="week"
          placeholder="week"
        />
        <Input
          type="month"
          name="month"
          id="month"
          aria-label="month"
          placeholder="month"
        />
        <Input
          type="number"
          name="number"
          id="number"
          aria-label="number"
          placeholder="number"
        />
        <Input
          type="range"
          name="range"
          id="range"
          aria-label="range"
          placeholder="range"
        />
        <Input
          type="color"
          name="color"
          id="color"
          aria-label="color"
          placeholder="color"
        />
        <Input
          type="image"
          name="image"
          id="image"
          aria-label="image"
          placeholder="image"
        />
      </form>
    </div>
  );
}

export default App;
