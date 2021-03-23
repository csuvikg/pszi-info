package hu.info.pszi.api.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@Data
public class Address implements Serializable {
    private String country;
    private String city;
    private int postalCode;
    private String street;

    @Column(length = 8)
    private String number;
}
