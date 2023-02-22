import { useForm, Controller } from "react-hook-form";
import { Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
//import style from "@/styles/Form.module.css";
import Form from "react-bootstrap/Form";
import SideBar from "@/components/sidebar/SideBar";
import { AxiosPost } from "../../utils/api";
import { useEffect, useState } from "react";
import Select from "react-select";
import { basecr, basech } from "../../utils/api";

import Message from "@/components/alert";
import DatePicker from "@/components/datepicker";
import axios from "axios";
export default function CreeEmp() {
  const [message, setMessage] = useState("");
  const [date, setDateError] = useState(false);
  const [datea, setdatea] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [imagelink, setimagelink] = useState("");
  useEffect(() => {
    /*axios
      .get(`${basech}/allch`)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== "ok") {
          alert(message, status);
        } else {
          let drivers = [];
          data.forEach((d) => {
            drivers.push({ value: d._id, label: d.fullname });
          });
          setDrivers(drivers);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });*/
  }, []);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handeldatechange = (e) => {
    setDateError(false);
    let pattern =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    let result = pattern.test(e);
    if (result == false) {
      setDateError(true);
      console.log("date error");
    }

    setdatea(e);
    console.log("datea", datea);
  };

  const submit = async (data) => {
    let formdata = new FormData();
    console.log(datea);
    // Object.keys(data).forEach((key) => formdata.append(key, data[key]));
    formdata.append("avatar", data.image[0]);
    delete data.image;
    data.datea = datea;
    Object.keys(data).forEach((key) => {
      if (typeof data[key] == "object") {
        console.log(data[key]);
        formdata.append(key, JSON.stringify(data[key]));
      } else {
        formdata.append(key, data[key]);
      }
    });

    // formdata.append("lch", JSON.stringify(data.lch));

    setMessage("");
    let { data: d } = await AxiosPost(`${basecr}/add`, formdata);
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
        <FormContainer title="Ajouter Vehicule">
          {message && <Message message={message} />}
          <form onSubmit={handleSubmit(submit)}>
            <Form.Label className="fs-5">Nom Vehicule</Form.Label>
            <Form.Control {...register("vname", { required: true })} />
            {/*<input {...register("firstName", { required: true })} />*/}
            {errors.vname && <p> ⚠ Le Nom Est Obligatoire.</p>}
            <Form.Label className="fs-5">Matricule</Form.Label>
            <Form.Control
              {...register("immat", { required: true, pattern: /\d+/ })}
            />
            {errors.immat && <p> ⚠ Mat Est Obligatoire.</p>}
            {/** */}
            <div className="row mt-3">
              <div className="col">
                <Form.Label className="fs-5">Date Acquisition</Form.Label>
                <br></br>
                <DatePicker onChange={handeldatechange}></DatePicker>
                {date && <p> ⚠ date Est Obligatoire.</p>}
              </div>

              {/**  <div className="col">
                <Form.Label className="fs-5">Liste Chauffeur</Form.Label>
                <Controller
                  {...register("lch", { required: true })}
                  //name="licensetype"
                  render={({ field }) => (
                    <Select {...field} options={drivers} />
                  )}
                  control={control}
                  defaultValue=""
                />
                {errors.lch && <p> ⚠ La License Type Est Obligatoire.</p>}
              </div>*/}
            </div>

            {/** */}

            <div className="row">
              <div className="col">
                <Form.Label className="fs-5">Compteur Initial</Form.Label>
                <Form.Control
                  {...register("compteur", { required: true, pattern: /\d+/ })}
                />
                {errors.compteur && <p> ⚠ Le C.I Est Obligatoire.</p>}
              </div>
              <div className="col">
                <Form.Label className="fs-5">N° Serie</Form.Label>
                <Form.Control
                  {...register("nserie", { required: true, pattern: /\d+/ })}
                />
                {errors.nserie && <p> ⚠ Le N° Serie Est Obligatoire.</p>}
              </div>
            </div>
            {/** */}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control
                type="file"
                {...register("image", { required: true })}
                onChange={(e) => console.log(e.target.files.length)}
              />
              {errors.image && <p> ⚠ Le N° Serie Est Obligatoire.</p>}
              <img src={imagelink}></img>
            </Form.Group>
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
