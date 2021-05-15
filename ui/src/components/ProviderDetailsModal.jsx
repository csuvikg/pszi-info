import {
    Button,
    CardActions, CardContent,
    CardHeader,
    Chip,
    Dialog, DialogActions, DialogContent,
    Link,
    makeStyles,
    Typography
} from "@material-ui/core";
import {AlternateEmail, Description, FlashOn, Phone, Update, Web} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    bold: {
        fontWeight: "bold"
    },
    cardActionContainers: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        "& > *": {
            margin: "0.5rem"
        }
    },
    container: {
        padding: "1rem 1.5rem"
    },
    chip: {
        margin: "0 3px"
    },
    chipContainer: {
        display: "flex",
        padding: "0 0.5rem 1rem 0.5rem"
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    }
}));

const dayLabels = {
    MONDAY: "Hétfő",
    TUESDAY: "Kedd",
    WEDNESDAY: "Szerda",
    THURSDAY: "Csütörtök",
    FRIDAY: "Péntek",
    SATURDAY: "Szombat",
    SUNDAY: "Vasárnap"
}

const targetGroupLabels = {
    CHILDREN: "Gyermekek",
    TEENAGERS: "Serdülők",
    ADULTS: "Felnőttek"
}

export const ProviderDetailsModal = ({open, onClose, data}) => {
    const classes = useStyles();
    console.log(data);
    const {
        name,
        targetGroups,
        address: {city, address, postalCode},
        phoneNumber,
        email,
        website,
        workingHours,
        isReservationNeeded,
        isReferralNeeded,
        acceptsUrgentCases
    } = data;

    return <Dialog
        open={open}
        onClose={onClose}
        style={{textAlign: "center"}}
    >
        <DialogContent>
            <CardHeader
                title={name}
                subheader={`${postalCode} ${city}, ${address}`}
            />
            <CardActions disableSpacing className={classes.cardActionContainers}>
                {isReservationNeeded && isReservationNeeded === "TRUE" &&
                <Chip icon={<Update/>} label="Időpontfoglalás szükséges"/>
                }
                {isReferralNeeded && isReferralNeeded === "TRUE" &&
                <Chip icon={<Description/>} label="Beutaló szükséges"/>
                }
                {acceptsUrgentCases && acceptsUrgentCases === "TRUE" &&
                <Chip icon={<FlashOn/>} label="Sürgős esetben ellát"/>
                }
                {phoneNumber &&
                <Link href={`tel:${phoneNumber}`} style={{textDecoration: "none"}}>
                    <Chip icon={<Phone/>} label={phoneNumber}/>
                </Link>
                }
                {email &&
                <Link href={`mailto:${email}`} style={{textDecoration: "none"}}>
                    <Chip icon={<AlternateEmail/>} label={email}/>
                </Link>
                }
                {website &&
                <Link href={website} target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>
                    <Chip icon={<Web/>} label={(website.length > 30) ? website.substr(0, 29) + '...' : website}/>
                </Link>
                }
                {targetGroups && targetGroups.length > 0 && targetGroups.map(tg =>
                    <Chip key={tg} label={targetGroupLabels[tg]}/>
                )}
            </CardActions>
            <CardContent>
                {workingHours && workingHours.length > 0 &&
                <>
                    <Typography color="textSecondary" component="p">Nyitvatartás</Typography>
                    {workingHours.filter(({_, workingHours: whs}) => whs && whs.length > 0)
                        .map(({day, workingHours: whs}) =>
                            <Typography key={day} variant="body2" color="textSecondary" component="p">
                                <span className={classes.bold}>{`${dayLabels[day]}: `}</span>
                                {whs.join(", ")}
                            </Typography>
                        )}
                </>
                }
            </CardContent>
        </DialogContent>
        <DialogActions style={{padding: "2rem"}}>
            <Button onClick={onClose} variant="contained">
                Bezárás
            </Button>
        </DialogActions>
    </Dialog>
}
