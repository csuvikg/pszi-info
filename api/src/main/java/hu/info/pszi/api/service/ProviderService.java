package hu.info.pszi.api.service;

import hu.info.pszi.api.model.provider.Coords;
import hu.info.pszi.api.model.provider.Day;
import hu.info.pszi.api.model.provider.Provider;
import hu.info.pszi.api.model.Version;
import hu.info.pszi.api.model.provider.ProviderDto;
import hu.info.pszi.api.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProviderService {
    private final ProviderRepository providerRepository;
    private final GeocodingService geocodingService;

    @Autowired
    public ProviderService(ProviderRepository providerRepository, GeocodingService geocodingService) {
        this.providerRepository = providerRepository;
        this.geocodingService = geocodingService;
    }

    @CacheEvict(value = "providersVersion", allEntries = true)
    public void deleteProviderById(int id) {
        providerRepository.findById(id).ifPresent(providerRepository::delete);
    }

    public List<ProviderDto> listProviders() {
        return StreamSupport.stream(providerRepository.findAll().spliterator(), false)
                .map(ProviderDto::new)
                .collect(Collectors.toList());
    }

    public Optional<Provider> findProviderById(int id) {
        return providerRepository.findById(id);
    }

    @CacheEvict(value = "providersVersion", allEntries = true)
    public Provider createProvider(Provider provider) {
        Coords coords = geocodingService.geocode(provider.getAddress())
                .map(latLng -> new Coords(latLng.lat, latLng.lng))
                .orElse(new Coords(0, 0));
        provider.getAddress().setCoords(coords);
        return providerRepository.save(provider);
    }

    @Cacheable("providersVersion")
    public Optional<Version> getLatestVersion() {
        return Optional
                .of(StreamSupport.stream(providerRepository.findAll().spliterator(), true)
                        .mapToLong(Provider::getModifiedDate)
                        .max())
                .filter(OptionalLong::isPresent)
                .map(OptionalLong::getAsLong)
                .map(Version::new);
    }
}
