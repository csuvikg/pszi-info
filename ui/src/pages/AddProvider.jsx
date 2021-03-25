import {
    Button, Card, CardContent,
    Checkbox, Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel, Grid, InputAdornment, InputBase,
    InputLabel, MenuItem,
    Select, TextareaAutosize, TextField, withStyles
} from "@material-ui/core";
import {useState} from "react";
import {WorkingHoursWeekInput} from "../components";

const SelectInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);


export const AddProvider = () => {
    const [waitingList, setWaitingList] = useState("UNKNOWN");

    return <Grid container spacing={3} style={{textAlign: "center", justifyContent: "center"}}>
        <Grid item xs={12} md={8} lg={6}>
            <form onSubmit={e => console.log(e.target)} style={
                {
                    display: "flex",
                    flexDirection: "column",
                    width: "100%"
                }
            }>
                <FormControl style={{margin: "1rem 0"}}>
                    <TextField required id="institutionName" variant="outlined" size="small" label="Név"/>
                </FormControl>
                <Divider variant="middle" style={{marginBottom: "1rem"}}/>
                <FormControl component="fieldset">
                    <FormLabel component="legend" style={{margin: "1rem 0"}}>Elérhetőségek</FormLabel>
                    <FormGroup aria-label="contacts">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField required id="postalCode" variant="outlined" size="small" label="Irányítószám"
                                           style={{
                                               width: "100%"
                                           }}/>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField required id="city" variant="outlined" size="small" label="Település" style={{
                                    width: "100%"
                                }}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required id="address" variant="outlined" size="small" label="Cím" style={{
                                    width: "100%"
                                }}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="phoneNumber" variant="outlined" size="small" label="Telefonszám"
                                           style={{
                                               width: "100%"
                                           }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="email" type="email" variant="outlined" size="small" label="Email cím"
                                           style={{
                                               width: "100%"
                                           }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="website" variant="outlined" size="small" label="Weboldal" style={{
                                    width: "100%"
                                }}/>
                            </Grid>
                            <Grid item xs={12}>
                                <WorkingHoursWeekInput/>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </FormControl>
                <Divider variant="middle" style={{marginTop: "1rem", marginBottom: "1rem"}}/>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Betegfelvétel</FormLabel>
                    <FormGroup aria-label="patient admission">
                        <FormControlLabel
                            value="isReservationNeeded"
                            control={<Checkbox color="primary"/>}
                            label="Előjegyzés szükséges"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="isReferralNeeded"
                            control={<Checkbox color="primary"/>}
                            label="Beutaló szükséges"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="acceptsUrgentCasesImmediately"
                            control={<Checkbox color="primary"/>}
                            label="Sürgős esetben azonnal ellát"
                            labelPlacement="end"
                        />
                        <FormControl>
                            <InputLabel id="waitingList">Várólista</InputLabel>
                            <Select
                                labelId="waitingList"
                                value={waitingList}
                                onChange={e => setWaitingList(e.target.value)}
                                input={<SelectInput/>}
                                style={{textAlign: "left"}}
                            >
                                <MenuItem value="UNKNOWN"><em>Ismeretlen</em></MenuItem>
                                <MenuItem value="DAYS">Néhány nap</MenuItem>
                                <MenuItem value="WEEKS">Néhány hét</MenuItem>
                                <MenuItem value="MONTHS">Néhány hónap</MenuItem>
                            </Select>
                        </FormControl>
                    </FormGroup>
                    <Divider variant="middle" style={{marginTop: "1rem"}}/>
                    <TextField multiline rows={5} variant="outlined" label="Megjegyzések" style={{margin: "1rem 0"}}/>
                </FormControl>
                <Button type="submit" style={{margin: "1rem 0", width: "50%", alignSelf: "flex-end"}}
                        variant="contained" color="primary">Elküldés</Button>
            </form>
        </Grid>
    </Grid>

    // return <Form onSubmit={console.log} render={({ handleSubmit }) => (
    //     <form onSubmit={handleSubmit}>
    //         <h2>Simple Default Input</h2>
    //         <div>
    //             <label>First Name</label>
    //             <Field name="firstName" component="input" placeholder="First Name" />
    //         </div>
    //
    //         <h2>An Arbitrary Reusable Input Component</h2>
    //         <div>
    //             <label>Interests</label>
    //             <Field name="interests" component={InterestPicker} />
    //         </div>
    //
    //         <h2>Render Function</h2>
    //         <Field
    //             name="bio"
    //             render={({ input, meta }) => (
    //                 <div>
    //                     <label>Bio</label>
    //                     <textarea {...input} />
    //                     {meta.touched && meta.error && <span>{meta.error}</span>}
    //                 </div>
    //             )}
    //         />
    //
    //         <h2>Render Function as Children</h2>
    //         <Field name="phone">
    //             {({ input, meta }) => (
    //                 <div>
    //                     <label>Phone</label>
    //                     <input type="text" {...input} placeholder="Phone" />
    //                     {meta.touched && meta.error && <span>{meta.error}</span>}
    //                 </div>
    //             )}
    //         </Field>
    //
    //         <button type="submit">Submit</button>
    //     </form>
    // )}
    // />
}
