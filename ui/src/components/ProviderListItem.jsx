import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader, Chip,
    Collapse,
    IconButton, Link,
    makeStyles, Paper, Tooltip,
    Typography
} from "@material-ui/core";
import {AlternateEmail, Description, ExpandMore, FlashOn, Phone, Room, Update, Web} from "@material-ui/icons";
import {useState} from "react";
import clsx from "clsx";

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

const useStyles = makeStyles((theme) => ({
    bold: {
        fontWeight: "bold"
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

export const ProviderListItem = ({data}) => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(false);
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

    return <Card>
        <CardHeader
            action={
                <IconButton>
                    <Room color="primary"/>
                </IconButton>
            }
            title={name}
            subheader={`${postalCode} ${city}, ${address}`}
        />
        <CardActions disableSpacing>
            {phoneNumber &&
            <Tooltip title={phoneNumber}>
                <Link component={IconButton} href={`tel:${phoneNumber}`}>
                    <Phone/>
                </Link>
            </Tooltip>
            }
            {email &&
            <Tooltip title={email}>
                <Link component={IconButton} href={`mailto:${email}`}>
                    <AlternateEmail/>
                </Link>
            </Tooltip>
            }
            {website &&
            <Tooltip title={website}>
                <Link component={IconButton} href={website} target="_blank" rel="noreferrer">
                    <Web/>
                </Link>
            </Tooltip>
            }
            {isReservationNeeded && isReservationNeeded === "TRUE" &&
            <Tooltip title="Időpontfoglalás szükséges">
                <IconButton>
                    <Update/>
                </IconButton>
            </Tooltip>
            }
            {isReferralNeeded && isReferralNeeded === "TRUE" &&
            <Tooltip title="Beutaló szükséges">
                <IconButton>
                    <Description/>
                </IconButton>
            </Tooltip>
            }
            {acceptsUrgentCases && acceptsUrgentCases === "TRUE" &&
            <Tooltip title="Sürgős esetben ellát">
                <IconButton>
                    <FlashOn/>
                </IconButton>
            </Tooltip>
            }
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: isOpen,
                })}
                onClick={() => setOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Több információ"
            >
                <ExpandMore/>
            </IconButton>
        </CardActions>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <CardContent>
                <Box className={classes.chipContainer}>
                    {targetGroups && targetGroups.length > 0 && targetGroups.map(tg =>
                        <Chip className={classes.chip} key={tg} label={targetGroupLabels[tg]}/>
                    )}
                </Box>
                {workingHours && workingHours.length > 0 &&
                <Paper className={classes.container}>
                    <Typography color="textSecondary" component="p">Nyitvatartás</Typography>
                    {workingHours.map(({day, workingHours: whs}) =>
                        <Typography key={day} variant="body2" color="textSecondary" component="p">
                            <span className={classes.bold}>{`${dayLabels[day]}: `}</span>
                            {`${whs.join(", ")}`}
                        </Typography>
                    )}
                </Paper>
                }
            </CardContent>
        </Collapse>
    </Card>
}
