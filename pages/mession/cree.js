import { useForm, Controller } from "react-hook-form";
import { Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
//import style from "@/styles/Form.module.css";
import Form from "react-bootstrap/Form";
import SideBar from "@/components/sidebar/SideBar";
import { AxiosPost } from "../../utils/api";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { basech, baseemp, basems, getAllEmp } from "../../utils/api";
import DatePicker from "@/components/datepicker";
import moment from "moment";
import axios from "axios";

import Message from "@/components/alert";
import DatePickerTime from "@/components/datepickertime";
import CustomClearIndicator from "@/components/multipleselect";
import DatePickerT from "@/components/dtpicker";
export default function CreeMession() {
  const [message, setMessage] = useState("");
  const [date, setDateError] = useState(false);
  const [datep, setdatep] = useState();
  const [datepd, setdatepd] = useState();
  const [datepr, setdatepr] = useState();
  const [dated, setdated] = useState();
  const [dater, setdater] = useState();
  const [emp, setemp] = useState([]);
  //const emp = getAllEmp();
  const [itn, setitn] = useState([]);
  const [distance, setdistance] = useState("");
  const [selecteditn, setselecteditn] = useState(" ");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function getallemp() {
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

  async function getalliteneraire() {
    axios
      .get(`${basems}/getitn`)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== "ok") {
          alert(message, status);
        } else {
          let itns = [];
          data.forEach((d) => {
            itns.push({
              value: d._id,
              label: d.Description,
              distance: d.Distance,
            });
          });
          setitn(itns);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getallemp();
    getalliteneraire();
  }, []);
  //////////////////::
  const handeldatechange = (e) => {
    setDateError(false);
    console.log(e);

    let pattern =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

    let result = pattern.test(e.format("L"));
    if (result == false) {
      setDateError(true);
      console.log("date error");
    }

    setdatep(`${e.format("L") + " " + e.format("LT")}`);
    console.log("datep", datep);
  };
  const handelitnchange = (e) => {
    console.log(e);
    setselecteditn(e);
    setdistance(e.distance);
  };
  const handledtmschange = (e) => {
    console.log(e);
  };
  ///////////:
  const submit = async (data) => {
    data.distance = distance;
    console.log(data);
    console.log(datep);
    return;
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
        <FormContainer title="Cree Mession">
          {message && <Message message={message} />}
          <form onSubmit={handleSubmit(submit)}>
            <div className="row">
              <div className="col">
                <Form.Label className="fs-5">N° Mession</Form.Label>
                <Form.Control
                  {...register("nmession", { required: true, pattern: /\d+/ })}
                />
                {errors.nmession && <p> ⚠ Le N° Est Obligatoire.</p>}
              </div>
              <div className="col">
                <Form.Label className="fs-5">Date Planification</Form.Label>
                <br></br>
                <DatePickerTime
                  onTimeChange={handeldatechange}
                ></DatePickerTime>
                {date && <p> ⚠ date Est Obligatoire.</p>}
              </div>
            </div>

            {/** */}

            <div className="row">
              <div className="col">
                <Form.Label className="fs-5">Missionnaire</Form.Label>
                <Controller
                  {...register("missionnaire", { required: true })}
                  //name="licensetype"
                  render={({ field }) => <Select {...field} options={emp} />}
                  control={control}
                  defaultValue=""
                />
                {errors.missionnaire && (
                  <p> ⚠ La License Type Est Obligatoire.</p>
                )}
              </div>
              <div className="col">
                <Form.Label className="fs-5">Fonction</Form.Label>
                <Form.Control {...register("fnc", { required: true })} />
                {errors.fnc && <p> ⚠ Fonction Est Obligatoire.</p>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Form.Label className="fs-5">accompanier</Form.Label>
                <Controller
                  {...register("accomp")}
                  //name="licensetype"
                  render={({ field }) => (
                    <Select
                      {...field}
                      defaultValue={{ value: "AL", label: "Alabama" }}
                      isMulti
                      name="colors"
                      options={[
                        { value: "AL", label: "Alabama" },
                        { value: "NY", label: "NEWYORK" },
                      ]}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  )}
                  control={control}
                  defaultValue=""
                />
                {errors.accomp && <p> ⚠ accomp Est Obligatoire.</p>}
              </div>
            </div>

            {/** */}
            <div className="row">
              <div className="col">
                <Form.Label className="fs-5">Distance</Form.Label>
                <Form.Control value={distance} {...register("distance")} />
                {errors.distance && <p> ⚠ Le N° Est Obligatoire.</p>}
              </div>
              <div className="col">
                <Form.Label className="fs-5">Itineraire</Form.Label>
                <Controller
                  {...register("itineraire")}
                  //name="licensetype"
                  value={selecteditn}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={itn}
                      defaultValue={selecteditn}
                      onChange={handelitnchange}
                    />
                  )}
                  control={control}
                />
              </div>
            </div>
            {/** */}
            <div className="row">
              <div className="col">
                <Form.Label className="fs-5">Date Planification</Form.Label>
                <br></br>
                <DatePicker
                  onChange={(e) => handledtmschange(e, "dpd")}
                ></DatePicker>
              </div>
              <div className="col">
                <Form.Label className="fs-5">Date Planification</Form.Label>
                <br></br>
                <DatePicker
                  onChange={(e) => handledtmschange(e, "dpr")}
                ></DatePicker>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Form.Label className="fs-5">Date Planification</Form.Label>
                <br></br>
                <DatePickerT
                  onChange={(e) => handledtmschange(e, "dd")}
                ></DatePickerT>
              </div>
              <div className="col">
                <Form.Label className="fs-5">Date Planification</Form.Label>
                <br></br>
                <DatePickerT
                  onChange={(e) => handledtmschange(e, "dr")}
                ></DatePickerT>
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
