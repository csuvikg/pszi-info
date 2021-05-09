import {ACTIONS} from "../actions";
import {filterProviders} from "../providers/actions";
import dayjs from "dayjs";

export const applyFilters = filters => dispatch => {
    dispatch({
        type: ACTIONS.UPDATE_FILTERS,
        filters
    });
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
    const filterFunctions = []
    if (cityValues.length > 0) {
        filterFunctions.push(({address}) => address && address.city && cityValues.includes(address.city));
    }
    if (targetGroupsValues.length > 0) {
        filterFunctions.push(({targetGroups}) => targetGroups && targetGroups.some(gr => targetGroupsValues.includes(gr)));
    }
    if (mustBeOpen) {
        const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const now = dayjs();
        const checkIfIsBetween = ({fromTime, toTime}) => {
            const nowComparable = now.hour() * 60 + now.minute();
            const [fromHours, fromMinutes] = fromTime.split(":");
            const fromComparable = parseInt(fromHours) * 60 + parseInt(fromMinutes);
            const [toHours, toMinutes] = toTime.split(":");
            const toComparable = parseInt(toHours) * 60 + parseInt(toMinutes);
            return fromComparable <= nowComparable && nowComparable <= toComparable;
        }
        filterFunctions.push(({workingHours}) => workingHours &&
            workingHours.some(({day, fromTime, toTime}) =>
                days[now.day()] === day && checkIfIsBetween({fromTime, toTime})
            ));
    }
    if (mustHavePhoneNumber) {
        filterFunctions.push(({phoneNumber}) => phoneNumber && phoneNumber !== "");
    }
    if (mustHaveEmailAddress) {
        filterFunctions.push(({email}) => email && email !== "");
    }
    if (mustHaveWebsite) {
        filterFunctions.push(({website}) => website && website !== "");
    }
    if (isReservationNeededValues.length > 0) {
        filterFunctions.push(({isReservationNeeded}) => isReservationNeeded && isReservationNeededValues.includes(isReservationNeeded));
    }
    if (isReferralNeededValues.length > 0) {
        filterFunctions.push(({isReferralNeeded}) => isReferralNeeded && isReferralNeededValues.includes(isReferralNeeded));
    }
    if (acceptsUrgentCasesValues.length > 0) {
        filterFunctions.push(({acceptsUrgentCases}) => acceptsUrgentCases && acceptsUrgentCasesValues.includes(acceptsUrgentCases));
    }
    if (waitingListValues.length > 0) {
        filterFunctions.push(({waitingList}) => waitingList && waitingListValues.includes(waitingList));
    }
    dispatch(filterProviders(filterFunctions));
}

export const removeFilters = () => dispatch => {
    dispatch({
        type: ACTIONS.CLEAR_FILTERS
    });
    dispatch(filterProviders([]));
}
