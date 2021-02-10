package hu.info.pszi.api.controller;

import hu.info.pszi.api.model.Provider;
import hu.info.pszi.api.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/providers")
public class ProviderController {
    final ProviderRepository repository;

    @Autowired
    public ProviderController(ProviderRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<Iterable<Provider>> findAllProviders() {
        return ResponseEntity.ok(repository.findAll());
    }
}
