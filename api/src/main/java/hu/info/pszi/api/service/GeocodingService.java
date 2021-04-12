package hu.info.pszi.api.service;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import hu.info.pszi.api.model.provider.Address;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

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
    public Optional<LatLng> geocode(Address address) {
        String addressString = address.getAddress() + " "
                + address.getCity() + ", "
                + address.getPostalCode() + ", Hungary";

        GeocodingResult[] results = GeocodingApi.geocode(geoApiCtx, addressString)
                .components(country("Hungary"), postalCode(Integer.toString(address.getPostalCode())))
                .await();

        return Arrays.stream(results)
                .map(result -> result.geometry.location)
                .findFirst();
    }
}
