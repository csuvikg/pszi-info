package hu.info.pszi.api.repository;

import hu.info.pszi.api.model.Provider;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProviderRepository extends ReactiveMongoRepository<Provider, String> {
}
