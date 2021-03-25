import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
} from "@material-ui/core";
import {useState} from "react";
import {WorkingHoursInput} from "./WorkingHoursInput";
import {Add} from "@material-ui/icons";
import {WorkingHoursAddModal} from "./WorkingHoursAddModal";

export const DAYS = {
    MONDAY: {
        value: "MONDAY",
        label: "Hétfő",
        shortLabel: "H",
        workingHours: []
    },
    TUESDAY: {
        value: "TUESDAY",
        label: "Kedd",
        shortLabel: "K",
        workingHours: []
    },
    WEDNESDAY: {
        value: "WEDNESDAY",
        label: "Szerda",
        shortLabel: "Sz",
        workingHours: []
    },
    THURSDAY: {
        value: "THURSDAY",
        label: "Csütörtök",
        shortLabel: "Cs",
        workingHours: []
    },
    FRIDAY: {
        value: "FRIDAY",
        label: "Péntek",
        shortLabel: "P",
        workingHours: []
    },
    SATURDAY: {
        value: "SATURDAY",
        label: "Szombat",
        shortLabel: "Sz",
        workingHours: []
    },
    SUNDAY: {
        value: "SUNDAY",
        label: "Vasárnap",
        shortLabel: "V",
        workingHours: []
    }
}

export const WorkingHoursWeekInput = () => {
    const [workingHours, setWorkingHours] = useState(DAYS);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleAddWorkingHours = ({days, from, to}) => {
        const workingHoursTemp = {...workingHours};
        days.forEach(day => workingHoursTemp[day].workingHours.push({from, to}));
        setWorkingHours(workingHoursTemp);
    }

    const handleDialogToggle = () => {
        setDialogOpen(!isDialogOpen);
    }

    const handleDayChanged = (data) => console.log(data);

    return <>
        <FormControl component="fieldset">
            <FormLabel component="legend" style={{margin: "1rem 0"}}>Munkaidő</FormLabel>
            <FormGroup aria-label="working hours">
                <Grid container spacing={1}>
                    {Object.values(workingHours).filter(({workingHours}) => workingHours.length > 0).map(data =>
                        <Grid key={`${data.value}-grid`} item xs={12} sm={6} md={4}>
                            <WorkingHoursInput data={data} onChange={handleDayChanged} key={data.value}/>
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
