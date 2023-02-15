import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
//import style from "@/styles/Form.module.css";
import Form from "react-bootstrap/Form";
import SideBar from "@/components/sidebar/SideBar";
import { AxiosPost } from "../utils/api";
import { useState } from "react";

import Message from "@/components/alert";
export default function FormApp() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = async (data) => {
    setMessage("");

    let { data: d } = await AxiosPost("http://localhost:5000/emp/add", data);
    if (d.status == "ok") {
      setMessage(d.message);
      reset();
    }
    console.log(d);
    /*if (response.status == "ok") {
      console.log("sucess");
      setMessage(response.data.message);
    }*/
  };

  return (
    <>
      <SideBar>
        <FormContainer title="Ajouter Employee">
          {message && <Message message={message} />}
          <form onSubmit={handleSubmit(submit)}>
            <Form.Label className="fs-5">Nom</Form.Label>
            <Form.Control {...register("firstName", { required: true })} />
            {/*<input {...register("firstName", { required: true })} />*/}
            {errors.firstName && <p> ⚠ Le Nom Est Obligatoire.</p>}
            <Form.Label className="fs-5">Prenom</Form.Label>
            <Form.Control {...register("lastName", { required: true })} />
            {errors.lastName && <p> ⚠ Le Prenom Est Obligatoire.</p>}
            <Form.Label className="fs-5">Désignation</Form.Label>
            <Form.Control {...register("Designation", { required: true })} />
            {errors.Designation && <p> ⚠La désignation est requise.</p>}
            <Form.Label className="fs-5">NID de L'Employé</Form.Label>
            <Form.Control {...register("nid", { pattern: /\d+/ })} />
            {errors.nid && <p> ⚠ Le NID Est Obligatoire.</p>}
            <input
              className="btn btn-primary mt-3"
              type="submit"
              value="Ajouter employee"
            />
          </form>
        </FormContainer>
      </SideBar>
    </>
  );
}
