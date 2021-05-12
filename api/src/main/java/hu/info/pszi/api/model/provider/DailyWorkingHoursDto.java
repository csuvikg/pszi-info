package hu.info.pszi.api.model.provider;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DailyWorkingHoursDto {
    private Day day;
    private List<String> workingHours;
}
