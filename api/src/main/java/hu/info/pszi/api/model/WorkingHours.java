package hu.info.pszi.api.model;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalTime;

@Getter
@Entity
public class WorkingHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Day day;

    private LocalTime fromTime;

    private LocalTime toTime;
}
