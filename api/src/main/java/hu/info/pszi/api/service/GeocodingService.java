package hu.info.pszi.api.service;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.model.GeocodingResult;
import hu.info.pszi.api.model.Address;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

import static com.google.maps.model.ComponentFilter.country;
import static com.google.maps.model.ComponentFilter.postalCode;

@Service
public class GeocodingService {
    final GeoApiContext geoApiCtx;

    @Autowired
    public GeocodingService(GeoApiContext geoApiCtx) {
        this.geoApiCtx = geoApiCtx;
    }

    @SneakyThrows
    public List<GeocodingResult> getResults(Address address) {
        String addressString = address.getAddress() + " "
                + address.getCity() + ", "
                + address.getPostalCode() + ", Hungary";

        return Arrays.asList(GeocodingApi.geocode(geoApiCtx, addressString)
                .components(country("Hungary"), postalCode(Integer.toString(address.getPostalCode())))
                .await());
    }

    @SneakyThrows
    public List<GeocodingResult> getResults(String address) {
        return Arrays.asList(GeocodingApi.geocode(geoApiCtx, address).await());
    }
}
