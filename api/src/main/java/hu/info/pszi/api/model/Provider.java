package hu.info.pszi.api.model;

import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity(name = "provider")
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull
    private String name;

    @Embedded
    @NotNull
    private Address address;

    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL)
    private List<OpeningHours> openingHours;

    private String phoneNumber;

    private String website;

    private boolean isReservationNeeded;

    private boolean isReferralNeeded;

    private boolean acceptsUrgentCasesImmediately;

    private WaitingList waitingList;

    @Lob
    private String comments;
}
