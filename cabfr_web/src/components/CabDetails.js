import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteCab } from "../services/auth_services";
import { useNavigate } from "react-router-dom";
import { getCabFromStorage, getPersonalDriverFromStorage, removeCabFromStorage, setCabInStorage, setDriverInStorage } from "../services/localStorageHandler";
import { removeDriverFromCab } from "../services/user_services";

const CabDetails = ({isCustomer,isAdmin,isDriver}) => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [cab, setCab] = useState(() => {
        const temp = getCabFromStorage();
        return temp;
    });

    const [driver, setDriver] = useState(() => {
        const temp = getPersonalDriverFromStorage();
        return temp;
    })

    const [open1, setOpen1] = useState(false);

    const handleToClose = () => {
        deleteCab(cab.reg_no);
        removeCabFromStorage();
        setOpen(false);
        navigate("/cabs");
    };

    const handleCancel = ()=>{
        setOpen(false);
        setOpen1(false);
    }

    const navFunc = () => {
        navigate("/cabsUpdate")
    }

    const handleRequest = ()=>{
        setCabInStorage(cab);
        navigate("/cabRequest")
    }

    const seeRequestsForCab = () => {
        navigate("/requestsForCab");
    }

    // customer Cab
    const seeCustomerCabForCab = () => {
        navigate("/cabCustomerByCab");
    }

    const seeDriverForCab = () => {
        setDriverInStorage(cab.driver)
        navigate("/driverDetail")
    }

    const AssignDriver = () => {
        setCabInStorage(cab);
        navigate("/assignDriver")
    }

    const openDialog = () => {
        setOpen1(true);
    }

    const handleToClose1 = () => {
        removeDriverFromCab(cab.reg_no);
        setOpen1(false);
        navigate("/cabs")
    }

    return (
        <div>
            <p>{cab.reg_no}</p>
            <p>{cab.model}</p>
            <p>{cab.colour}</p>
            <p>{cab.fare}</p>

            {(cab.driver) ? <>
                <p>{cab.driver.id}</p>
                <p>{cab.driver.driverName}</p>
                <p>{cab.driver.email}</p>
                <p>{cab.driver.phone}</p>
                
            </> : null}

            {isCustomer &&
            <button onClick={handleRequest} className="btn btn-primary btn-block">
                Request Cab
            </button>    
            }  

            {isAdmin && 

            <>
            <button onClick={seeRequestsForCab} className="btn btn-primary btn-block">
                See all requests for this Cab
            </button>

            <button onClick={navFunc} className="btn btn-primary btn-block">
                Update Cab
            </button>

            <button onClick={()=>{setOpen(true)}} className="btn btn-primary btn-block">
                Delete Cab
            </button>

            <button onClick={seeCustomerCabForCab} className="btn btn-primary btn-block">
                See all records for this Cab
            </button>
            </>
            } 

            {((isDriver) && (cab.driver) && (cab.driver.id === driver.id)) && 

            <>
            <button onClick={seeRequestsForCab} className="btn btn-primary btn-block">
                See all requests for this Cab
            </button>

            <button onClick={seeCustomerCabForCab} className="btn btn-primary btn-block">
                See all records for this Cab
            </button>
            </>
            } 

            {isAdmin ? 
            <button onClick={AssignDriver} className="btn btn-primary btn-block">
                Assign Driver
            </button>
            : null }

            {(cab.driver) ? <>
                <button onClick={seeDriverForCab} className="btn btn-primary btn-block">
                    See driver of this cab
                </button>
                {isAdmin &&
                    <button onClick={openDialog} className="btn btn-primary btn-block">
                        Remove Driver of this cab
                    </button>
                }
            </> : null}

            
             
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Cab"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the Cab?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>

            <Dialog open={open1} onClose={handleToClose1}>
                <DialogTitle>{"Remove Driver for Cab"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove the driver for this cab?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        Cancel
                    </button>
                    <button onClick={handleToClose1}
                        color="primary" autoFocus>
                        Remove
                    </button>
                    
                </DialogActions>
            </Dialog>
            
            
        </div>
    )
}

export default CabDetails;