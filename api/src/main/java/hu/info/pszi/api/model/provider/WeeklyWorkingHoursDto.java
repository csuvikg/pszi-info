package hu.info.pszi.api.model.provider;

import lombok.Getter;

import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class WeeklyWorkingHoursDto {
    private List<DailyWorkingHoursDto> workingHours;

    public WeeklyWorkingHoursDto(Provider provider) {
        workingHours = provider.getWorkingHours() != null ? Arrays.stream(Day.values())
                .filter(day -> provider.getWorkingHours().stream()
                        .anyMatch(wh -> wh.getDay().equals(day)))
                .map(day -> new DailyWorkingHoursDto(day, provider.getWorkingHours().stream()
                        .filter(wh -> wh.getDay().equals(day))
                        .map(wh -> wh.getFromTime().format(DateTimeFormatter.ofPattern("HH:mm")) + " - " + wh.getToTime().format(DateTimeFormatter.ofPattern("HH:mm")))
                        .sorted()
                        .collect(Collectors.toList())))
                .collect(Collectors.toList()) : Collections.emptyList();
    }
}
