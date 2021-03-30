import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
    Typography
} from "@material-ui/core";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import PropTypes from "prop-types";
import {useState} from "react";
import {DAY_LABELS, DAYS} from "./consts";
import {TimePicker} from "@material-ui/pickers";
import dayjs from "dayjs";


export const WorkingHoursAddModal = ({open, onClose, onSave}) => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [fromTime, setFromTime] = useState(dayjs("08:00", "HH:mm"));
    const [toTime, setToTime] = useState(dayjs("16:00", "HH:mm"));
    const handleDaysChanged = (_, newSelection) => setSelectedDays(newSelection);
    const handleClose = () => {
        onClose();
        setSelectedDays([]);
        setFromTime(dayjs("08:00", "HH:mm"));
        setToTime(dayjs("16:00", "HH:mm"));
    }

    return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{textAlign: "center"}}>
        <DialogTitle id="form-dialog-title">Munkaidő hozzáadása</DialogTitle>
        <DialogContent>
            <Typography color="textSecondary">Napok</Typography>
            <ToggleButtonGroup value={selectedDays} onChange={handleDaysChanged}
                               style={{width: "100%", justifyContent: "center"}}>
                {Object.values(DAYS).map(day => <ToggleButton key={day} value={day} style={{width: "14%"}}>
                    {DAY_LABELS[day].shortLabel}
                </ToggleButton>)}
            </ToggleButtonGroup>
            <Grid container style={{padding: "1rem", alignItems: "center", justifyContent: "center"}}>
                <Grid item xs={12} sm={2}>
                    <TimePicker inputVariant="outlined" ampm={false}
                                minutesStep={5} value={fromTime} autoOk={true} onChange={setFromTime}
                                cancelLabel="Mégsem" okLabel="Elfogadás"/>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography>-</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TimePicker inputVariant="outlined" ampm={false} minutesStep={5} value={toTime} autoOk={true}
                                onChange={setToTime} cancelLabel="Mégsem" okLabel="Elfogadás"/>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions style={{padding: "2rem"}}>
            <Button onClick={handleClose} variant="contained">
                Mégsem
            </Button>
            <Button
                onClick={() => {
                    handleClose();
                    onSave({
                        days: selectedDays,
                        from: fromTime.format("HH:mm"),
                        to: toTime.format("HH:mm")
                    });
                }} variant="contained" color="primary">
                Hozzáadás
            </Button>
        </DialogActions>
    </Dialog>
}

WorkingHoursAddModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}
