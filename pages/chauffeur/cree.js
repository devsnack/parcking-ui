import { useForm, Controller } from "react-hook-form";
import { Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
//import style from "@/styles/Form.module.css";
import Form from "react-bootstrap/Form";
import SideBar from "@/components/sidebar/SideBar";
import { AxiosPost } from "../../utils/api";
import { useState } from "react";
import Select from "react-select";
import { basech } from "../../utils/api";

import Message from "@/components/alert";
export default function CreeEmp() {
  const [message, setMessage] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = async (data) => {
    delete data.ltype.label;
    data.ltype = data.ltype.value;
    console.log(data);
    setMessage("");
    let { data: d } = await AxiosPost(`${basech}/add`, data);
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
        <FormContainer title="Ajouter Chauffeur">
          {message && <Message message={message} />}
          <form onSubmit={handleSubmit(submit)}>
            <Form.Label className="fs-5">Nom Complet</Form.Label>
            <Form.Control {...register("fullname", { required: true })} />
            {/*<input {...register("firstName", { required: true })} />*/}
            {errors.fullname && <p> ⚠ Le Nom Est Obligatoire.</p>}
            <Form.Label className="fs-5">NID de chauffeur</Form.Label>
            <Form.Control
              {...register("nid", { required: true, pattern: /\d+/ })}
            />
            {errors.nid && <p> ⚠ Le NID Est Obligatoire.</p>}
            {/** */}

            <div className="row">
              <div className="col">
                <Form.Label className="fs-5">Numéro de Licence</Form.Label>
                <Form.Control
                  {...register("nlc", { required: true, pattern: /\d+/ })}
                />
                {errors.nlc && <p> ⚠ Le NDL Est Obligatoire.</p>}
              </div>
              <div className="col">
                <Form.Label className="fs-5">License Type</Form.Label>
                <Controller
                  {...register("ltype", { required: true })}
                  //name="licensetype"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: "Categorie B", label: "Categorie B" },
                        { value: "Categorie C", label: "Categorie C" },
                        { value: "Categorie D", label: "Categorie D" },
                        { value: "Categorie E", label: "Categorie E" },
                      ]}
                    />
                  )}
                  control={control}
                  defaultValue=""
                />
                {errors.ltype && <p> ⚠ La License Type Est Obligatoire.</p>}
              </div>
            </div>
            {/** */}

            <input
              className="btn btn-primary mt-3"
              type="submit"
              value="Ajouter Chaffeur"
            />
          </form>
        </FormContainer>
      </SideBar>
    </>
  );
}
