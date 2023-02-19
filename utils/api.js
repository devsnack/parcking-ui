import axios from "axios";

export const AxiosPost = async (url, payload) => {
  try {
    const response = await axios.post(url, payload);
    return response;
  } catch (error) {}
};

export let base = "http://localhost:5000";
export let basech = "http://localhost:5000/ch";
export let basecr = "http://localhost:5000/cr";
