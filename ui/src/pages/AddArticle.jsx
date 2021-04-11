import {Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useMemo, useRef, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import JoditEditor from "jodit-react";
import {useDispatch} from "react-redux";
import {createArticle} from "../services";

const useStyles = makeStyles((theme) => ({
    buttonGroup: {
        textAlign: "right",
        padding: "1rem 0"
    },
    container: {
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto"
    }
}));

export const AddArticle = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const editor = useRef(null)
    const [content, setContent] = useState("");
    const setContentDebounced = useDebouncedCallback((value) => {
        setContent(value);
    }, 2000);

    const handleSave = () => dispatch(createArticle(content));

    const config = useMemo(() => {
        return {
            readonly: false, // all options from https://xdsoft.net/jodit/doc/
            language: "hu"
        }
    }, []);

    return <Grid container className={classes.container}>
        <Grid item xs={12} md={10} lg={8}>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
                onChange={setContentDebounced}
            />
        </Grid>
        <Grid item xs={12} md={10} lg={8} className={classes.buttonGroup}>
            <Button color="primary" variant="contained" onClick={handleSave}>Mentés</Button>
        </Grid>
    </Grid>
}
