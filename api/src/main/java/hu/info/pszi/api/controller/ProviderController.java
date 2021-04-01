package hu.info.pszi.api.controller;

import hu.info.pszi.api.model.Provider;
import hu.info.pszi.api.service.GeocodingService;
import hu.info.pszi.api.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;


@RestController
@RequestMapping("/providers")
public class ProviderController {
    final ProviderService providerService;
    final GeocodingService geocodingService;

    @Autowired
    public ProviderController(ProviderService providerService, GeocodingService geocodingService) {
        this.providerService = providerService;
        this.geocodingService = geocodingService;
    }

    @GetMapping
    public ResponseEntity<Iterable<Provider>> findAllProviders() {
        return ResponseEntity.ok(providerService.listProviders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Provider> findProviderById(@PathVariable int id) {
        return providerService.findProviderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Provider> createProvider(@RequestBody Provider provider) {
        Provider createdProvider = providerService.createProvider(provider);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdProvider.getId())
                .toUri();

        return ResponseEntity.created(location)
                .body(createdProvider);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProviderById(@PathVariable int id) {
        providerService.deleteProviderById(id);
        return ResponseEntity.noContent().build();
    }
}
