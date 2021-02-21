package hu.info.pszi.api.controller;

import com.google.maps.model.GeocodingResult;
import hu.info.pszi.api.model.Provider;
import hu.info.pszi.api.repository.ProviderRepository;
import hu.info.pszi.api.service.GeocodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/providers")
public class ProviderController {
    final ProviderRepository repository;
    final GeocodingService geocodingService;

    @Autowired
    public ProviderController(ProviderRepository repository, GeocodingService geocodingService) {
        this.repository = repository;
        this.geocodingService = geocodingService;
    }

    @GetMapping
    public ResponseEntity<Iterable<Provider>> findAllProviders() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Provider> findProviderById(@PathVariable Integer id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Provider> createProvider(@RequestBody Provider provider) {
        Provider createdProvider = repository.save(provider);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdProvider.getId())
                .toUri();

        List<GeocodingResult> results = geocodingService.getResults(createdProvider.getAddress());
        System.out.println(results);

        return ResponseEntity.created(location)
                .body(createdProvider);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProviderById(@PathVariable Integer id) {
        repository.findById(id).ifPresent(repository::delete);
        return ResponseEntity.noContent().build();
    }
}
