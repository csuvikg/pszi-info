package hu.info.pszi.api.model.provider;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@Data
@Entity(name = "provider")
@EntityListeners(AuditingEntityListener.class)
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
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

    @Enumerated
    @ElementCollection(targetClass = TargetGroup.class)
    private List<TargetGroup> targetGroups;

    @Lob
    private String comment;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    @JsonIgnore
    private long createdDate;

    @LastModifiedDate
    @JsonIgnore
    private long modifiedDate;
}
