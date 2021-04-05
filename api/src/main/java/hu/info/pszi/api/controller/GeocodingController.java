package hu.info.pszi.api.controller;

import com.google.maps.model.GeocodingResult;
import hu.info.pszi.api.model.Address;
import hu.info.pszi.api.service.GeocodingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/geocoding")
public class GeocodingController {
  final GeocodingService service;

  public GeocodingController(GeocodingService service) {
    this.service = service;
  }

  @PostMapping
  public ResponseEntity<List<GeocodingResult>> geocode(@RequestBody Address address) {
    return ResponseEntity.ok(service.getResults(address));
  }
}
