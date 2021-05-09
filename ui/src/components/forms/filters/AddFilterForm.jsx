import {
    Checkbox,
    FormControl, FormControlLabel, Input,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {applyFilters} from "../../../services";
import {CheckboxGroup} from "../CheckboxGroup";

export const AddFilterForm = () => {
    const dispatch = useDispatch();
    const {filters, providers: {cities}} = useSelector(state => state);
    const {
        cityValues,
        targetGroupsValues,
        mustBeOpen,
        mustHavePhoneNumber,
        mustHaveEmailAddress,
        mustHaveWebsite,
        isReservationNeededValues,
        isReferralNeededValues,
        acceptsUrgentCasesValues,
        waitingListValues
    } = filters;

    const handleChange = ({key, value}) => {
        dispatch(applyFilters({
            ...filters,
            [key]: value
        }))
    }

    // todo: Add info that it will shrink results

    return <>
        <FormControl fullWidth>
            <InputLabel id="cityValues-label">Települések</InputLabel>
            <Select
                labelId="cityValues-label"
                id="cityValues-checkbox"
                multiple
                value={cityValues}
                onChange={({target: value}) => handleChange({key: "cityValues", value: value.value})}
                input={<Input/>}
                renderValue={(selected) => selected.join(', ')}
                // MenuProps={MenuProps}
            >
                {cities.map(city => (
                    <MenuItem key={city} value={city}>
                        <Checkbox color="primary" checked={cityValues.includes(city)}/>
                        <ListItemText primary={city}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <CheckboxGroup value={targetGroupsValues} label={"Célcsoport:"}
                       onChange={value => handleChange({key: "targetGroupsValues", value})} options={[
            {value: "ADULTS", label: "Felnőtt"},
            {value: "TEENAGERS", label: "Serdülő"},
            {value: "CHILDREN", label: "Gyermek"}
        ]}/>
        <FormControlLabel
            control={<Checkbox checked={mustBeOpen} onChange={e => handleChange({
                key: e.target.name,
                value: e.target.checked
            })} name="mustBeOpen"/>}
            label="Most nyitva"
        />
        <FormControlLabel
            control={<Checkbox checked={mustHavePhoneNumber} onChange={e => handleChange({
                key: e.target.name,
                value: e.target.checked
            })} name="mustHavePhoneNumber"/>}
            label="Telefonszámmal rendelkezik"
        />
        <FormControlLabel
            control={<Checkbox checked={mustHaveEmailAddress} onChange={e => handleChange({
                key: e.target.name,
                value: e.target.checked
            })} name="mustHaveEmailAddress"/>}
            label="Emaillel rendelkezik"
        />
        <FormControlLabel
            control={<Checkbox checked={mustHaveWebsite} onChange={e => handleChange({
                key: e.target.name,
                value: e.target.checked
            })} name="mustHaveWebsite"/>}
            label="Weboldallal rendelkezik"
        />
        <CheckboxGroup value={isReservationNeededValues} label={"Időpontfoglalás:"}
                       onChange={value => handleChange({key: "isReservationNeededValues", value})} options={[
            {value: "UNKNOWN", label: "Nincs adat"},
            {value: "TRUE", label: "Szükséges"},
            {value: "FALSE", label: "Nem szükséges"}
        ]}/>
        <CheckboxGroup value={isReferralNeededValues} label={"Beutaló:"}
                       onChange={value => handleChange({key: "isReferralNeededValues", value})} options={[
            {value: "UNKNOWN", label: "Nincs adat"},
            {value: "TRUE", label: "Szükséges"},
            {value: "FALSE", label: "Nem szükséges"}
        ]}/>
        <CheckboxGroup value={acceptsUrgentCasesValues} label={"Sürgős esetben ellát:"}
                       onChange={value => handleChange({key: "acceptsUrgentCasesValues", value})} options={[
            {value: "UNKNOWN", label: "Nincs adat"},
            {value: "TRUE", label: "Igen"},
            {value: "FALSE", label: "Nem"}
        ]}/>
        <CheckboxGroup value={waitingListValues} label={"Várólista:"}
                       onChange={value => handleChange({key: "waitingListValues", value})} options={[
            {value: "UNKNOWN", label: "Nincs adat"},
            {value: "NONE", label: "Nincs várólista"},
            {value: "DAYS", label: "Néhány nap"},
            {value: "WEEKS", label: "Néhány hét"},
            {value: "MONTHS", label: "Néhány hónap"}
        ]}/>
    </>
}
