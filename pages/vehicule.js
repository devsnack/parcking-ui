import { useState } from "react";
import axios from "axios";

export default function MakeCar() {
  const [data, useData] = useState("");
  const showValue = (e) => {
    console.log(e.target.value);
    useData(e.target.value);
  };
  const sendData = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/test", { name: data }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  return (
    <>
      <h1>CAR page</h1>
      <form>
        <label>AJOUTER chauffeur</label>
        <input type="text" onChange={showValue} />
        <button onClick={sendData}>SEND DATA</button>
      </form>
    </>
  );
}
