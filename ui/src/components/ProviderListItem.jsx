import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    IconButton, Link,
    makeStyles,
    Typography
} from "@material-ui/core";
import {AlternateEmail, ExpandMore, Phone, Room, Web} from "@material-ui/icons";
import {useState} from "react";
import clsx from "clsx";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

export const ProviderListItem = ({data}) => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(false);
    const {
        name,
        address: {city, address, postalCode},
        phoneNumber,
        email,
        website,
        workingHours
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
        {/*<CardContent>*/}
        {/*    {workingHours.map(entry =>*/}
        {/*        <Typography variant="body2" color="textSecondary" component="p">*/}
        {/*            {`${entry.day}: ${entry.fromTime} - ${entry.toTime}`}*/}
        {/*        </Typography>*/}
        {/*    )}*/}
        {/*</CardContent>*/}
        <CardActions disableSpacing>
            {phoneNumber &&
            <Link component={IconButton} href={`tel:${phoneNumber}`}>
                <Phone/>
            </Link>
            }
            {email &&
            <Link component={IconButton} href={`mailto:${email}`}>
                <AlternateEmail/>
            </Link>
            }
            {website &&
            <Link component={IconButton} href={website} target="_blank" rel="noreferrer">
                <Web/>
            </Link>
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
                {workingHours.map(entry =>
                    <Typography key={entry.id} variant="body2" color="textSecondary" component="p">
                        {`${entry.day}: ${dayjs(entry.fromTime, "HH:mm:ss").format("HH:mm")} - ${dayjs(entry.toTime, "HH:mm:ss").format("HH:mm")}`}
                    </Typography>
                )}
                <Typography variant="body1" color="textSecondary" component="p">
                    Telefonszám: {phoneNumber}
                </Typography>
            </CardContent>
        </Collapse>
    </Card>
}
