package hu.info.pszi.api.model;

import javax.persistence.Embeddable;

@Embeddable
public class Address {
    private String country;
    private String city;
    private String postalCode;
    private String street;
    private String number;
}
