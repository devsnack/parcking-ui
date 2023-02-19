import React from "react";
import { useEffect, useState } from "react";
import { Button, Modal, ModalTitle } from "react-bootstrap";
import axios from "axios";
import { basech, basecr } from "../utils/api";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Avatar from "@mui/material/Avatar";

export default function InfoDetails() {
  const [Data, setData] = useState([]);
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);

  const handleViewShow = () => {
    SetViewShow(true);
  };
  const hanldeViewClose = () => {
    setDelete(false);
    SetViewShow(false);
  };
  //FOr Edit Model
  const [ViewEdit, SetEditShow] = useState(false);
  const handleEditShow = (item) => {
    SetEditShow(true);
    SetRowData(item);
    //
    setfullname(item.fullname);
    console.log("first name", fullname);
    setnid(item.nic);
    setnlc(item.nlc);
    setltype(item.ltype);
  };
  const hanldeEditClose = () => {
    SetEditShow(false);
    setupdateerror(false);
  };
  //FOr Delete Model
  const [ViewDelete, SetDeleteShow] = useState(false);
  const handleDeleteShow = () => {
    SetDeleteShow(true);
  };
  const hanldeDeleteClose = () => {
    SetDeleteShow(false);
  };
  //FOr Add New Data Model
  const [ViewPost, SetPostShow] = useState(false);
  const handlePostShow = () => {
    SetPostShow(true);
  };
  const hanldePostClose = () => {
    SetPostShow(false);
  };
  // DEFINE LOCAL STATE FOR ERRORS
  const [updateerror, setupdateerror] = useState(false);

  //Define here local state that store the form Data
  const [fullname, setfullname] = useState("");
  const [nid, setnid] = useState("");
  const [nlc, setnlc] = useState("");
  const [ltype, setltype] = useState("");
  //const [address, setaddress] = useState("");

  const [Delete, setDelete] = useState(false);
  //Id for update record and Delete
  const [id, setId] = useState("");
  const GetEmployeeData = () => {
    //here we will get all employee data
    const url = `${basecr}/allcars`;
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== "ok") {
          alert(message, status);
        } else {
          setData(data);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmite = () => {
    const url = "http://localhost:8000/employee";
    const Credentials = { name, email, number, nic, address };
    axios
      .post(url, Credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== "ok") {
          alert(message, status);
        } else {
          alert(message);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = () => {
    setupdateerror(false);
    console.log(ltype);

    const url = `${basech}/editCh/${id}`;

    const Credentials = { fullname, nid, nlc, ltype };
    if (fullname == "" || nid == "" || nlc == "" || ltype == "") {
      setupdateerror(true);
      return;
    }
    console.log("credentials", Credentials);
    console.log("sended");
    axios
      .put(url, Credentials)
      .then((response) => {
        const result = response.data;
        const { status, message } = result;
        if (status !== "ok") {
          alert(message, status);
        } else {
          alert("Modifier avec succeè");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //handle Delete Function
  const handleDelete = () => {
    const url = `${basech}/deleteCh/${id}`;
    axios
      .delete(url)
      .then((response) => {
        const result = response.data;
        const { status, message } = result;
        if (status !== "ok") {
          alert(message, status);
        } else {
          alert("Supprimé avec succès");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //call this function in useEffect
  console.log(ViewShow, RowData);
  useEffect(() => {
    GetEmployeeData();
  }, []);
  return (
    <div>
      <div className="row">{/* */}</div>
      <div className="row">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th></th>
                <th>Nom Complet</th>
                <th>NID</th>
                <th>Numéro de Licence</th>
                <th>License Type</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={`http://localhost:5000/${item.file}`}
                      style={{
                        width: "100px",
                        height: "70px",
                        "object-fit": "contains",
                      }}
                    ></img>
                  </td>
                  <td>{item.vname.toUpperCase()}</td>
                  <td>{item.immat}</td>
                  <td>{item.lch.label}</td>
                  <td>{item.compteur}</td>
                  <td>{item.datea}</td>

                  <td style={{ minWidth: 190 }}>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        handleViewShow(SetRowData(item));
                      }}
                    >
                      View
                    </Button>
                    |
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => {
                        handleEditShow(item, SetRowData(item), setId(item._id));
                      }}
                    >
                      Edit
                    </Button>
                    |
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        handleViewShow(
                          SetRowData(item),
                          setId(item._id),
                          setDelete(true)
                        );
                      }}
                    >
                      Delete
                    </Button>
                    |
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* View Modal */}
      <div className="model-box-view">
        <Modal
          show={ViewShow}
          onHide={hanldeViewClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>View Employee Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={RowData._id}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="email"
                  className="form-control"
                  value={RowData.fullname}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.nid}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.nlc}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.ltype}
                  readOnly
                />
              </div>

              {Delete && (
                <Button
                  type="submit"
                  className="btn btn-danger mt-4"
                  onClick={handleDelete}
                >
                  Delete Employee
                </Button>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hanldeViewClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* Modal for submit data to database */}

      {/* Modal for Edit employee record */}
      <div className="model-box-view">
        <Modal
          show={ViewEdit}
          onHide={hanldeEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {updateerror && (
                <p style={{ color: "red " }}>Attention champs vide</p>
              )}
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setfullname(e.target.value)}
                  placeholder=""
                  defaultValue={RowData.fullname}
                />
              </div>
              <div className="form-group mt-3">
                <label>NID</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setnid(e.target.value)}
                  placeholder=""
                  defaultValue={RowData.nid}
                />
              </div>
              <div className="form-group mt-3">
                <label>Numéro de Licence</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setnlc(e.target.value)}
                  placeholder=""
                  defaultValue={RowData.nlc}
                />
              </div>
              <div className="form-group mt-3">
                <label>Licence Type</label>
                {/** */}
                <div className="col">
                  <Select
                    defaultInputValue={RowData.ltype}
                    onChange={(event) => setltype(event.value)}
                    options={[
                      { value: "Categorie B", label: "Categorie B" },
                      { value: "Categorie C", label: "Categorie C" },
                      { value: "Categorie D", label: "Categorie D" },
                      { value: "Categorie E", label: "Categorie E" },
                    ]}
                  />
                </div>
                {/** */}
              </div>

              <Button
                type="submit"
                className="btn btn-warning mt-4"
                onClick={handleEdit}
              >
                Edit Employee
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hanldeEditClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
