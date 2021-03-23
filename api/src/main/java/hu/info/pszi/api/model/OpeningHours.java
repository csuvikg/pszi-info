package hu.info.pszi.api.model;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Getter
public class OpeningHours {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Provider provider;

    private Day day;

    private LocalTime fromTime;

    private LocalTime toTime;
}
