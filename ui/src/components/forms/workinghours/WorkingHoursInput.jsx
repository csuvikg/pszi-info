import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
} from "@material-ui/core";
import {useState} from "react";
import {WorkingHoursDayItem} from "./WorkingHoursDayItem";
import {Add} from "@material-ui/icons";
import {WorkingHoursAddModal} from "./WorkingHoursAddModal";
import PropTypes from "prop-types";
import {DAYS} from "./consts";

const initState = Object.keys(DAYS).reduce((obj, key) => {
    obj[key] = [];
    return obj
}, {});

export const WorkingHoursInput = ({value, onChange}) => {
    const [workingHours, setWorkingHours] = useState(value || initState);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleAddWorkingHours = ({days, from, to}) => {
        const temp = {...workingHours};
        days.forEach(day => temp[day].push({from, to}));
        setWorkingHours(temp);
        onChange({
            target: {
                value: temp
            }
        });
    }

    const handleDialogToggle = () => setDialogOpen(!isDialogOpen);

    const handleWorkingHoursDeleted = ({day, i}) => {
        const temp = {...workingHours};
        temp[day].splice(i);
        setWorkingHours(temp);
        onChange({
            target: {
                value: temp
            }
        });
    }

    return <>
        <FormControl component="fieldset">
            <FormLabel component="legend" style={{margin: "1rem 0"}}>Munkaidő</FormLabel>
            <FormGroup aria-label="working hours">
                <Grid container spacing={1}>
                    {Object.entries(workingHours).filter(([_, value]) => value && value.length > 0).map(([key, value]) =>
                        <Grid key={`${key}-grid`} item xs={12} sm={6} md={4}>
                            <WorkingHoursDayItem day={key} data={value} onDelete={handleWorkingHoursDeleted} key={key}/>
                        </Grid>
                    )}
                    <Grid item xs={12} sm={6} md={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<Add/>}
                            style={{width: "100%", height: "100%", minWidth: "150px", maxWidth: "100%"}}
                            onClick={handleDialogToggle}
                        >
                            Hozzáadás
                        </Button>
                    </Grid>
                </Grid>
            </FormGroup>
        </FormControl>
        <WorkingHoursAddModal open={isDialogOpen} onClose={handleDialogToggle} onSave={handleAddWorkingHours}/>
    </>
}

WorkingHoursInput.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired
}