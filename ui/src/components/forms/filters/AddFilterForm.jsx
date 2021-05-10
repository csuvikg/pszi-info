import {
    Card, CardContent, CardHeader,
    Checkbox,
    FormControlLabel,
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {applyFilters} from "../../../services";
import {CheckboxGroup} from "../CheckboxGroup";
import {Multiselect} from "../Multiselect";
import {CheckboxInput} from "../CheckboxInput";

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
        <Multiselect id="citiValues"
                     label="Települések"
                     onChange={value => handleChange({key: "cityValues", value})}
                     options={cities}
                     value={cityValues}
        />
        <CheckboxGroup value={targetGroupsValues} label={"Célcsoport:"}
                       onChange={value => handleChange({key: "targetGroupsValues", value})} options={[
            {value: "ADULTS", label: "Felnőtt"},
            {value: "TEENAGERS", label: "Serdülő"},
            {value: "CHILDREN", label: "Gyermek"}
        ]}/>
        <Card>
            <CardHeader subheader="Megadott elérhetőségek:"/>
            <CardContent>
                <CheckboxInput label={"Telefonszám"}
                               onChange={value => handleChange({key: "mustHavePhoneNumber", value})}
                               value={mustHavePhoneNumber}
                />
                <CheckboxInput label={"Email cím"}
                               onChange={value => handleChange({key: "mustHaveEmailAddress", value})}
                               value={mustHaveEmailAddress}
                />
                <CheckboxInput label={"Weboldal"}
                               onChange={value => handleChange({key: "mustHaveWebsite", value})}
                               value={mustHaveWebsite}
                />
            </CardContent>
        </Card>
        <Multiselect onChange={value => handleChange({key: "isReservationNeededValues", value})}
                     value={isReservationNeededValues} label="Időpontfoglalás" id="isReservationNeededValues"
                     options={[
                         {value: "UNKNOWN", label: "Nincs adat"},
                         {value: "TRUE", label: "Szükséges"},
                         {value: "FALSE", label: "Nem szükséges"}
                     ]}
        />
        <Multiselect onChange={value => handleChange({key: "isReferralNeededValues", value})}
                     value={isReferralNeededValues} label="Beutaló" id="isReferralNeededValues"
                     options={[
                         {value: "UNKNOWN", label: "Nincs adat"},
                         {value: "TRUE", label: "Szükséges"},
                         {value: "FALSE", label: "Nem szükséges"}
                     ]}
        />
        <Multiselect onChange={value => handleChange({key: "acceptsUrgentCasesValues", value})}
                     value={acceptsUrgentCasesValues} label="Sürgős esetben ellát" id="acceptsUrgentCasesValues"
                     options={[
                         {value: "UNKNOWN", label: "Nincs adat"},
                         {value: "TRUE", label: "Igen"},
                         {value: "FALSE", label: "Nem"}
                     ]}
        />
        <Multiselect onChange={value => handleChange({key: "waitingListValues", value})}
                     value={waitingListValues}
                     label="Várólista"
                     id="waitingListValues"
                     options={[
                         {value: "UNKNOWN", label: "Nincs adat"},
                         {value: "NONE", label: "Nincs várólista"},
                         {value: "DAYS", label: "Néhány nap"},
                         {value: "WEEKS", label: "Néhány hét"},
                         {value: "MONTHS", label: "Néhány hónap"}
                     ]}
        />
        <CheckboxInput label={"Most nyitva"}
                       onChange={value => handleChange({key: "mustBeOpen", value})}
                       value={mustBeOpen}
                       style={{paddingLeft: "1rem", width: "100%"}}
        />
    </>
}
