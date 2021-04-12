package hu.info.pszi.api.service;

import hu.info.pszi.api.model.BaseEntity;
import hu.info.pszi.api.model.Version;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.OptionalLong;
import java.util.stream.StreamSupport;

public abstract class BaseService {
    public abstract Optional<Version> getLatestVersion();

    public <T extends BaseEntity, R extends CrudRepository<T, Integer>> Optional<Version> getLatestVersion(R repository) {
        return Optional
                .of(StreamSupport.stream(repository.findAll().spliterator(), true)
                        .mapToLong(BaseEntity::getModifiedDate)
                        .max())
                .filter(OptionalLong::isPresent)
                .map(OptionalLong::getAsLong)
                .map(Version::new);
    }
}
