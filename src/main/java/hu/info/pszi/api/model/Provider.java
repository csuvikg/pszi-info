package hu.info.pszi.api.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Provider {
    @Id
    private String id;
    private String name;
    private Address address;
}
