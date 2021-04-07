package hu.info.pszi.api.controller;

import com.google.maps.model.LatLng;
import hu.info.pszi.api.exceptions.GeocodingFailedException;
import hu.info.pszi.api.model.Address;
import hu.info.pszi.api.service.GeocodingService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/geocoding")
public class GeocodingController {
    final GeocodingService service;

    public GeocodingController(GeocodingService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<LatLng> geocode(@Validated @RequestBody Address address) {
        return service.geocode(address)
                .map(ResponseEntity::ok)
                .orElseThrow(GeocodingFailedException::new);
    }
}
