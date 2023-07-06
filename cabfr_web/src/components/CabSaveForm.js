import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { saveCab} from '../services/auth_services';
import {removeCabFromStorage } from "../services/localStorageHandler";
import { useCabSaveValidator } from "../validators/CabSaveValidator";
import image from "../assets/image.png";

const CabSaveForm = () => {
  
    const [open,setOpen] = React.useState(false);

    const [form, setForm] = useState({
        reg_no: "",
        model: "",
        colour:"",
        fare:""
  });

  const navigate = useNavigate();

  const handleClickToOpen = () => {
    setOpen(true);
};
  const [message, setMessage] = useState("");

  const {errors, validateForm} = useCabSaveValidator(form)

  const onUpdateField = e => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const handleToClose = () => {
    setOpen(false);
    navigate("/cabs")
    removeCabFromStorage();
  };

  const onSubmitForm = e => {
    setMessage("")
    e.preventDefault();    
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    saveCab(form.reg_no,form.model, form.colour,form.fare).then(
        response => {
            handleClickToOpen()
        },
        error => {
            const resMessage = (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            setMessage(resMessage)
        }
    )
};

  return (

    <div className="col-md-12">
        <div className="card card-container">
              <img
                src={image}
                alt="profile-img"
              />
              <br/>

            <form onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="reg_no">Registration Number</label>
                    <input
                    className="form-control"
                    type="text"
                    aria-label="reg_no"
                    name="reg_no"
                    placeholder="Registration Number"
                    value={form.reg_no}
                    onChange={onUpdateField}
                    />

                    {errors.reg_no.dirty && errors.reg_no.error ? (
                            <div className="alert alert-danger" role="alert">{errors.reg_no.message}</div>
                            ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="model">Model</label>
                    <input
                    className="form-control"
                    type="text"
                    aria-label="model"
                    name="model"
                    placeholder="Model"
                    value={form.model}
                    onChange={onUpdateField}
                    />

                    {errors.model.dirty && errors.model.error ? (
                            <div className="alert alert-danger" role="alert">{errors.model.message}</div>
                            ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="colour">Colour</label>
                    <input
                    className="form-control"
                    type="text"
                    aria-label="colour"
                    name="colour"
                    placeholder="Colour"
                    value={form.colour}
                    onChange={onUpdateField}
                    />

                    {errors.colour.dirty && errors.colour.error ? (
                            <div className="alert alert-danger" role="alert">{errors.colour.message}</div>
                            ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="fare">Fare</label>
                    <input
                    className="form-control"
                    type="text"
                    aria-label="fare"
                    name="fare"
                    placeholder="Fare"
                    value={form.fare}
                    onChange={onUpdateField}
                    />

                    {errors.fare.dirty && errors.fare.error ? (
                            <div className="alert alert-danger" role="alert">{errors.fare.message}</div>
                            ) : null}
                </div>
                <div className="form-group">
                    <button className="btn btn-block form-button" type="submit">
                    Save Cab
                    </button>
                </div>

                {message ? 
                  <div className="alert alert-danger" role="alert">{message}</div>
                : null}
            </form>
        </div>
        <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Cab Saved successfully"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Cab was saved successfully
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                          Close
                    </button>
                </DialogActions>
            </Dialog>
    </div>
  );
};

export default CabSaveForm;