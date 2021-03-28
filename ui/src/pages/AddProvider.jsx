import {
    Button,
    Divider,
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
    TextField,
} from "@material-ui/core";
import {useState} from "react";
import {SelectInput, WorkingHoursInput} from "../components";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    container: {
        textAlign: "center",
        justifyContent: "center"
    },
    spaceAround: {
        margin: "1rem 0"
    },
    submitButton: {
        margin: "1rem 0",
        width: "50%",
        alignSelf: "flex-end"
    }
}));

export const AddProvider = () => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [isReservationNeeded, setReservationNeeded] = useState("UNKNOWN");
    const [isReferralNeeded, setReferralNeeded] = useState("UNKNOWN");
    const [acceptsUrgentCases, setAcceptsUrgentCases] = useState("UNKNOWN");
    const [waitingList, setWaitingList] = useState("UNKNOWN");

    return <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} md={8} lg={6}>
            <form onSubmit={e => console.log(e.target)} style={
                {
                    display: "flex",
                    flexDirection: "column",
                    width: "100%"
                }
            }>
                <FormControl className={classes.spaceAround}>
                    <TextField required
                               id="institutionName"
                               variant="outlined"
                               size="small"
                               label="Intézmény neve"
                               value={name}
                               onChange={({target: {value}}) => setName(value)}
                    />
                </FormControl>
                <Divider variant="middle" style={{marginBottom: "1rem"}}/>
                <FormControl component="fieldset">
                    <FormLabel component="legend" className={classes.spaceAround}>Elérhetőségek</FormLabel>
                    <FormGroup aria-label="contacts">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth required id="postalCode" variant="outlined" size="small"
                                           label="Irányítószám"/>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField fullWidth required id="city" variant="outlined" size="small"
                                           label="Település"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth required id="address" variant="outlined" size="small" label="Cím"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="phoneNumber" variant="outlined" size="small"
                                           label="Telefonszám"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="email" type="email" variant="outlined" size="small"
                                           label="Email cím"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="website" variant="outlined" size="small" label="Weboldal"/>
                            </Grid>
                            <Grid item xs={12}>
                                <WorkingHoursInput/>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </FormControl>
                <Divider variant="middle" className={classes.spaceAround}/>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Betegfelvétel</FormLabel>
                    <FormGroup aria-label="patient admission">
                        <SelectInput id="isReservationNeeded"
                                     value={isReservationNeeded}
                                     label="Előjegyzés:"
                                     onChange={setReservationNeeded}
                                     options={[
                                         {value: "UNKNOWN", label: "Nincs adat"},
                                         {value: "TRUE", label: "Szükséges"},
                                         {value: "FALSE", label: "Nem szükséges"}
                                     ]}
                        />
                        <SelectInput id="isReferralNeeded"
                                     value={isReferralNeeded}
                                     label="Beutaló:"
                                     onChange={setReferralNeeded}
                                     options={[
                                         {value: "UNKNOWN", label: "Nincs adat"},
                                         {value: "TRUE", label: "Szükséges"},
                                         {value: "FALSE", label: "Nem szükséges"}
                                     ]}
                        />
                        <SelectInput id="acceptsUrgentCases"
                                     value={acceptsUrgentCases}
                                     label="Sürgős esetben ellát:"
                                     onChange={setAcceptsUrgentCases}
                                     options={[
                                         {value: "UNKNOWN", label: "Nincs adat"},
                                         {value: "TRUE", label: "Igen"},
                                         {value: "FALSE", label: "Nem"}
                                     ]}
                        />
                        <SelectInput id="waitingList"
                                     value={waitingList}
                                     label="Várólista:"
                                     onChange={setWaitingList}
                                     options={[
                                         {value: "UNKNOWN", label: "Nincs adat"},
                                         {value: "DAYS", label: "Néhány nap"},
                                         {value: "WEEKS", label: "Néhány hét"},
                                         {value: "MONTHS", label: "Néhány hónap"}
                                     ]}
                        />
                    </FormGroup>
                    <Divider variant="middle"/>
                    <TextField multiline rows={5} variant="outlined" label="Megjegyzések"
                               className={classes.spaceAround}/>
                </FormControl>
                <Button type="submit" className={classes.submitButton} variant="contained" color="primary">
                    Elküldés
                </Button>
            </form>
        </Grid>
    </Grid>
}
