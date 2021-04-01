import {Button, Divider, FormControl, FormGroup, FormLabel, Grid, TextField,} from "@material-ui/core";
import {useState} from "react";
import {SelectInput, WorkingHoursInput} from "../components";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {createProvider} from "../services";


const useStyles = makeStyles(() => ({
    form: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    container: {
        textAlign: "center",
        justifyContent: "center"
    },
    spaceAround: {
        margin: "1rem 0"
    },
    spaceBelow: {
        marginBottom: "1rem"
    },
    submitButton: {
        margin: "1rem 0",
        width: "50%",
        alignSelf: "flex-end"
    }
}));

export const AddProvider = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [workingHours, setWorkingHours] = useState([]);
    const [isReservationNeeded, setReservationNeeded] = useState("UNKNOWN");
    const [isReferralNeeded, setReferralNeeded] = useState("UNKNOWN");
    const [acceptsUrgentCases, setAcceptsUrgentCases] = useState("UNKNOWN");
    const [waitingList, setWaitingList] = useState("UNKNOWN");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProvider({
            name,
            address: {
                postalCode,
                city,
                address
            },
            phoneNumber,
            email,
            website,
            workingHours,
            isReservationNeeded,
            isReferralNeeded,
            acceptsUrgentCases,
            waitingList,
            comment
        }));
    }

    return <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} md={8} lg={6}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <FormControl className={classes.spaceAround}>
                    <TextField required
                               id="providerName"
                               variant="outlined"
                               size="small"
                               label="Intézmény neve"
                               value={name}
                               onChange={({target: {value}}) => setName(value)}
                    />
                </FormControl>
                <Divider variant="middle" className={classes.spaceBelow}/>
                <FormControl component="fieldset">
                    <FormLabel component="legend" className={classes.spaceAround}>Elérhetőségek</FormLabel>
                    <FormGroup aria-label="contacts">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth required id="postalCode"
                                           value={postalCode}
                                           onChange={({target: {value}}) => setPostalCode(value)}
                                           type="number"
                                           InputProps={{inputProps: {min: 1000, max: 9999}}}
                                           variant="outlined"
                                           size="small"
                                           label="Irányítószám"
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField fullWidth required id="city"
                                           value={city}
                                           onChange={({target: {value}}) => setCity(value)}
                                           variant="outlined"
                                           size="small"
                                           label="Település"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth required id="address"
                                           value={address}
                                           onChange={({target: {value}}) => setAddress(value)}
                                           variant="outlined"
                                           size="small"
                                           label="Cím"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="phoneNumber"
                                           value={phoneNumber}
                                           type="tel"
                                           onChange={({target: {value}}) => setPhoneNumber(value)}
                                           variant="outlined" size="small"
                                           label="Telefonszám"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="email"
                                           value={email}
                                           onChange={({target: {value}}) => setEmail(value)}
                                           type="email"
                                           variant="outlined"
                                           size="small"
                                           label="Email cím"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth id="website"
                                           value={website}
                                           onChange={({target: {value}}) => setWebsite(value)}
                                           type="url"
                                           variant="outlined"
                                           size="small"
                                           label="Weboldal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <WorkingHoursInput value={workingHours}
                                                   onChange={({target: {value}}) => setWorkingHours(value)}
                                />
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
                                         {value: "NONE", label: "Nincs várólista"},
                                         {value: "DAYS", label: "Néhány nap"},
                                         {value: "WEEKS", label: "Néhány hét"},
                                         {value: "MONTHS", label: "Néhány hónap"}
                                     ]}
                        />
                    </FormGroup>
                    <Divider variant="middle"/>
                    <TextField multiline rows={5} variant="outlined"
                               value={comment}
                               onChange={({target: {value}}) => setComment(value)}
                               label="Megjegyzések"
                               className={classes.spaceAround}
                    />
                </FormControl>
                <Button type="submit" className={classes.submitButton} variant="contained" color="primary">
                    Elküldés
                </Button>
            </form>
        </Grid>
    </Grid>
}
