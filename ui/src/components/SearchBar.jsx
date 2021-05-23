import {InputAdornment, TextField} from "@material-ui/core";
import {Search as SearchIcon} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useLocation} from "react-router";
import {useDebouncedCallback} from "use-debounce";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {applyFilters} from "../services";

const useStyles = makeStyles((theme) => ({
    searchBar: {
        marginLeft: "auto",
        "& .MuiInputBase-input": {
            color: "#fff",
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "#fff",
        },
        "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#fff",
        },
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        }
    },
    searchIcon: {
        color: "#fff"
    }
}));

export const SearchBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const history = useHistory();
    const {filters} = useSelector(state => state);
    const [searchTerm, setSearchTerm] = useState("");
    const [lastSearched, setLastSearched] = useState("");
    const setSearchTermDebounced = useDebouncedCallback(({target: {value}}) => {
        setSearchTerm(value);
    }, 1000);

    useEffect(() => {
        if (searchTerm !== lastSearched) {
            if (pathname !== "/" && pathname !== "/providers") {
                history.push("/providers");
            }
            dispatch(applyFilters({
                ...filters,
                search: searchTerm
            }))
            setLastSearched(searchTerm);
        }
    }, [dispatch, pathname, history, filters, searchTerm, lastSearched]);

    return <TextField
        className={classes.searchBar}
        placeholder="Keresés"
        onChange={setSearchTermDebounced}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon className={classes.searchIcon}/>
                </InputAdornment>
            ),
        }}
    />
}
