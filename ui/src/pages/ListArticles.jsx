import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listArticles} from "../services";
import {makeStyles} from "@material-ui/core/styles";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Grid,
    Typography
} from "@material-ui/core";
import DOMPurify from "dompurify";


const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        padding: "0 1rem 1rem 1rem",
        justifyContent: "flex-end"
    },
    container: {
        justifyContent: "center"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    media: {
        height: 140,
    },
}));

function ExpandMoreIcon() {
    return null;
}

export const ListArticles = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {articles} = useSelector(state => state.articles);

    useEffect(() => {
        dispatch(listArticles());
    }, [dispatch]);

    return <Grid container className={classes.container}>
        <Grid item xs={12} md={10} lg={8}>
            {articles.map(({id, title, content}) =>
                <Accordion key={id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                    >
                        <Typography className={classes.heading}>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}/>
                    </AccordionDetails>
                </Accordion>
            )}
        </Grid>
    </Grid>
}
