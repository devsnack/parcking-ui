import axios from "axios";
import { useState, useEffect, useRef } from "react";

export const AxiosPost = async (url, payload) => {
  try {
    const response = await axios.post(url, payload);
    return response;
  } catch (error) {}
};
export const getAllEmp = async () => {
  const [emp, setemp] = useState([]);
  useEffect(() => {
    async function getall() {
      axios
        .get(`${baseemp}/allemp`)
        .then((response) => {
          const result = response.data;
          const { status, message, data } = result;
          if (status !== "ok") {
            alert(message, status);
          } else {
            let emps = [];
            data.forEach((d) => {
              emps.push({
                value: d._id,
                label: `${d.lastname + " " + d.firstname}`,
              });
            });
            setemp(emps);
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getall();
  }, [emp]);
  return emp;
};

export let base = "http://localhost:5000";
export let baseemp = "http://localhost:5000/emp";
export let basech = "http://localhost:5000/ch";
export let basecr = "http://localhost:5000/cr";
export let basems = "http://localhost:5000/mession";
