import { Children, useState } from "react";
import * as yup from "yup";

interface LoginFormData {
  name: string;
  number: string;
}

const initialLoginFormData: LoginFormData = {
  name: "",
  number: "",
};

function App() {
  const [loginFormData, setLoginFormData] =
    useState<LoginFormData>(initialLoginFormData);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      console.log(loginFormData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoginFormData(initialLoginFormData);
    }
  };

 function validateForm(e: React.ChangeEvent<HTMLInputElement>) {
   const { name, value } = e.target;
   try {
     const updatedFormData = {
       ...loginFormData,
       [name]: value,
     };
     setLoginFormData(updatedFormData);

     const schema = yup.object().shape({
       name: yup.string().required(),
       number: yup.number().min(6).max(10).required(),
     });

     // Validate the entire form data
     schema.validateSync(updatedFormData);
     console.log("valid");
   } catch (error) {
     //console what are feilds that are getting error 
     console.log(error instanceof yup.ValidationError ? error.errors : error instanceof Error ? error.message : "Unknown error");
     console.log("invalid")
   }
 }


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 justify-center items-center w-full h-full p-5 "
      >
        <input
          type="text"
          name="name"
          placeholder="name"
          value={loginFormData.name}
          onChange={validateForm}
        />

        <input
          type="number"
          name="number"
          placeholder="number"
          value={loginFormData.number}
          onChange={validateForm}
        />

        <div className="flex gap-2 bg-slate-50  ">
          <button
            type="reset"
            value="Reset"
            className="bg-red-500 rounded-md p-2 text-white font-bold text-lg "
          >
            Clear
          </button>
          <button
            type="submit"
            value="Submit"
            className="bg-green-500 rounded-md p-2 text-white font-bold text-lg "
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default App;
