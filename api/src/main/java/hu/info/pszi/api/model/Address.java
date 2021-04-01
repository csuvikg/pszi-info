package hu.info.pszi.api.model;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@Data
public class Address implements Serializable {
    @NotNull
    private String city;

    @NotNull
    private int postalCode;

    @NotNull
    private String address;
}
