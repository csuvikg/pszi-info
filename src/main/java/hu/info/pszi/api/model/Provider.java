package hu.info.pszi.api.model;

import javax.persistence.*;

@Entity
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    @Embedded
    private Address address;
}
