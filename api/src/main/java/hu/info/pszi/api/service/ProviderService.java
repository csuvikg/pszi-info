package hu.info.pszi.api.service;

import hu.info.pszi.api.model.Provider;
import hu.info.pszi.api.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProviderService {
    private final ProviderRepository providerRepository;

    @Autowired
    public ProviderService(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    public void deleteProviderById(int id) {
        providerRepository.findById(id).ifPresent(providerRepository::delete);
    }

    public Iterable<Provider> listProviders() {
        return providerRepository.findAll();
    }

    public Optional<Provider> findProviderById(int id) {
        return providerRepository.findById(id);
    }

    public Provider createProvider(Provider provider) {
        return providerRepository.save(provider);
    }
}
