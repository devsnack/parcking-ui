import React from "react";
import { useEffect, useState } from "react";
import { Button, Modal, ModalTitle } from "react-bootstrap";
import axios from "axios";
import { base } from "../utils/api";
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
    setfirstname(item.firstname);
    console.log("first name", firstname);
    setlastname(item.lastname);
    setdesignation(item.designation);
    setnid(item.nid);
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
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [designation, setdesignation] = useState("");
  const [nid, setnid] = useState("");
  //const [address, setaddress] = useState("");

  const [Delete, setDelete] = useState(false);
  //Id for update record and Delete
  const [id, setId] = useState("");
  const GetEmployeeData = () => {
    //here we will get all employee data
    const url = `${base}/emp/allemp`;
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
    const url = `${base}/emp/editEmp/${id}`;

    const Credentials = { firstname, lastname, designation, nid };
    if (firstname == "" || lastname == "" || designation == "" || nid == "") {
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
    const url = `${base}/emp/deleteEmp/${id}`;
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
                <th>Nom</th>
                <th>Prenom</th>
                <th>Designation</th>
                <th>NID</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item) => (
                <tr key={item._id}>
                  <td>{item.lastname.toUpperCase()}</td>
                  <td>{item.firstname.toUpperCase()}</td>
                  <td>{item.designation.toUpperCase()}</td>
                  <td>{item.nid}</td>

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
                  value={RowData.firstname}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.lastname}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.designation}
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
      {/* <div className="model-box-view">
        <Modal
          show={ViewPost}
          onHide={hanldePostClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add new Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Please enter Name"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Please enter email"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setnumber(e.target.value)}
                  placeholder="Please enter Number"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setnic(e.target.value)}
                  placeholder="Please enter NIC"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setaddress(e.target.value)}
                  placeholder="Please enter Address"
                />
              </div>
              <Button
                type="submit"
                className="btn btn-success mt-4"
                onClick={handleSubmite}
              >
                Add Employee
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hanldePostClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div> */}
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
                  onChange={(e) => setlastname(e.target.value)}
                  placeholder=""
                  defaultValue={RowData.lastname}
                />
              </div>
              <div className="form-group mt-3">
                <label>Prenom</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setfirstname(e.target.value)}
                  placeholder=""
                  defaultValue={RowData.firstname}
                />
              </div>
              <div className="form-group mt-3">
                <label>Number</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setdesignation(e.target.value)}
                  placeholder=""
                  defaultValue={RowData.designation}
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
