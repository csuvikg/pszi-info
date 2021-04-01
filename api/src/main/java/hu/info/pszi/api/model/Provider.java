package hu.info.pszi.api.model;

import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Entity(name = "provider")
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private String name;

    @Embedded
    @NotNull
    private Address address;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "provider_id")
    private Set<WorkingHours> workingHours;

    private String phoneNumber;

    private String email;

    private String website;

    private IsReservationNeeded isReservationNeeded;

    private IsReferralNeeded isReferralNeeded;

    private AcceptsUrgentCases acceptsUrgentCases;

    private WaitingList waitingList;

    @Lob
    private String comment;
}
