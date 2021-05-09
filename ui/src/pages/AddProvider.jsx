import {
    Button, Card, CardContent, CardHeader, Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid, Hidden,
    TextField,
} from "@material-ui/core";
import {useState} from "react";
import {SelectInput, WorkingHoursInput} from "../components";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {createProvider} from "../services";


const useStyles = makeStyles((theme) => ({
    card: {
        height: "100%"
    },
    checkboxGroup: {
        flexDirection: "row",
        justifyContent: "center"
    },
    checkboxGroupContainer: {
        margin: theme.spacing(3)
    },
    disappearingDivider: {
        width: "calc(100% - 32px)",
        marginLeft: "auto !important",
        marginRight: "auto !important",
        marginTop: "6px",
        marginBottom: "6px"
    },
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
    const [targetGroups, setTargetGroups] = useState([]);
    const [isReservationNeeded, setReservationNeeded] = useState("UNKNOWN");
    const [isReferralNeeded, setReferralNeeded] = useState("UNKNOWN");
    const [acceptsUrgentCases, setAcceptsUrgentCases] = useState("UNKNOWN");
    const [waitingList, setWaitingList] = useState("UNKNOWN");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const provider = {
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
            targetGroups,
            isReservationNeeded,
            isReferralNeeded,
            acceptsUrgentCases,
            waitingList,
            comment
        };

        dispatch(createProvider(
            Object.entries(provider)
                .filter(([_, v]) => v !== "")
                .reduce((a, [k, v]) => {
                    a[k] = v;
                    return a;
                }, {})
        ));
    }

    const handleChangeTargetGroups = ({target: {value}}, shouldAdd) => {
        setTargetGroups(
            shouldAdd
                ? [...targetGroups, value]
                : targetGroups.filter(item => item !== value)
        );
    }

    return <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} md={8} lg={12} xl={8}>
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
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                        <Card className={classes.card}>
                            <CardHeader subheader="Elérhetőségek"/>
                            <CardContent>
                                <FormControl component="fieldset">
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
                            </CardContent>
                        </Card>
                    </Grid>
                    <Hidden lgUp>
                        <Divider variant="middle" className={classes.disappearingDivider}/>
                    </Hidden>
                    <Grid item xs={12} lg={6}>
                        <Card className={classes.card}>
                            <CardHeader subheader="Betegfelvétel"/>
                            <CardContent>
                                <FormControl fullWidth component="fieldset">
                                    {/*todo: solve with CheckBoxGroup*/}
                                    <FormControl component="fieldset" className={classes.checkboxGroupContainer}>
                                        <FormLabel component="legend">Célcsoport:</FormLabel>
                                        <FormGroup className={classes.checkboxGroup}>
                                            <FormControlLabel
                                                control={<Checkbox color="primary"
                                                                   checked={targetGroups.includes("CHILDREN")}
                                                                   onChange={handleChangeTargetGroups}
                                                                   name="CHILDREN"/>}
                                                label="Gyermekek" value="CHILDREN"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox color="primary"
                                                                   checked={targetGroups.includes("TEENAGERS")}
                                                                   onChange={handleChangeTargetGroups}
                                                                   name="TEENAGERS"/>}
                                                label="Serdülők" value="TEENAGERS"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox color="primary"
                                                                   checked={targetGroups.includes("ADULTS")}
                                                                   onChange={handleChangeTargetGroups} name="ADULTS"/>}
                                                label="Felnőttek" value="ADULTS"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                    <FormGroup aria-label="patient admission">
                                        <SelectInput id="isReservationNeeded"
                                                     value={isReservationNeeded}
                                                     label="Időpontfoglalás:"
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
                                </FormControl>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Divider variant="middle" className={classes.spaceAround}/>
                <TextField multiline rows={5} variant="outlined"
                           value={comment}
                           onChange={({target: {value}}) => setComment(value)}
                           label="Megjegyzések"
                />
                <Button type="submit" className={classes.submitButton} variant="contained" color="primary">
                    Elküldés
                </Button>
            </form>
        </Grid>
    </Grid>
}
