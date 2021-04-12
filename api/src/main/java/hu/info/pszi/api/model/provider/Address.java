package hu.info.pszi.api.model.provider;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@Data
public class Address implements Serializable {
    @NotBlank
    private String city;

    @Min(1000)
    @Max(9999)
    private int postalCode;

    @NotBlank
    private String address;

    @Embedded
    private Coords coords;
}
