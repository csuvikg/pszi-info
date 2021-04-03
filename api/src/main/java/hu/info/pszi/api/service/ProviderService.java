package hu.info.pszi.api.service;

import hu.info.pszi.api.model.Provider;
import hu.info.pszi.api.model.version.Version;
import hu.info.pszi.api.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.OptionalLong;
import java.util.stream.StreamSupport;

@Service
public class ProviderService {
    private final ProviderRepository providerRepository;

    @Autowired
    public ProviderService(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    @CacheEvict(value = "version", allEntries = true)
    public void deleteProviderById(int id) {
        providerRepository.findById(id).ifPresent(providerRepository::delete);
    }

    public Iterable<Provider> listProviders() {
        return providerRepository.findAll();
    }

    public Optional<Provider> findProviderById(int id) {
        return providerRepository.findById(id);
    }

    @CacheEvict(value = "version", allEntries = true)
    public Provider createProvider(Provider provider) {
        return providerRepository.save(provider);
    }

    @Cacheable("version")
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
