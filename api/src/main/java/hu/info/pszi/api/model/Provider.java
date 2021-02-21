package hu.info.pszi.api.model;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    @Embedded
    private Address address;
}
