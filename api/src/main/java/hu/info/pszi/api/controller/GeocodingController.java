package hu.info.pszi.api.controller;

import com.google.maps.model.GeocodingResult;
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

  @GetMapping
  public ResponseEntity<List<GeocodingResult>> geocode(@RequestParam String address) {
    return ResponseEntity.ok(service.getResults(address));
  }
}
