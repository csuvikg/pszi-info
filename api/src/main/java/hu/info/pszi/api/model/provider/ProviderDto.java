package hu.info.pszi.api.model.provider;

import lombok.Getter;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Getter
public class ProviderDto {
    private final int id;
    private final String name;
    private final Address address;
    private final List<DailyWorkingHoursDto> workingHours;
    private final String phoneNumber;
    private final String email;
    private final String website;
    private final IsReservationNeeded isReservationNeeded;
    private final IsReferralNeeded isReferralNeeded;
    private final AcceptsUrgentCases acceptsUrgentCases;
    private final WaitingList waitingList;
    private final List<TargetGroup> targetGroups;
    private final String comment;

    public ProviderDto(Provider provider) {
        WeeklyWorkingHoursDto weeklyWorkingHours = new WeeklyWorkingHoursDto(provider);

        id = provider.getId();
        name = provider.getName();
        address = provider.getAddress();
        workingHours = weeklyWorkingHours.getWorkingHours();
        phoneNumber = provider.getPhoneNumber();
        email = provider.getEmail();
        website = provider.getWebsite();
        isReservationNeeded = provider.getIsReservationNeeded();
        isReferralNeeded = provider.getIsReferralNeeded();
        acceptsUrgentCases = provider.getAcceptsUrgentCases();
        waitingList = provider.getWaitingList();
        targetGroups = provider.getTargetGroups();
        comment = provider.getComment();
    }
}
