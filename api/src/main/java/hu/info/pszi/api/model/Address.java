package hu.info.pszi.api.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Embeddable
@NoArgsConstructor
@Data
public class Address {
    private String country;
    private String city;
    private String postalCode;
    private String street;
    private String number;
}
