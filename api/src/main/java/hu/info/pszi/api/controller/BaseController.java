package hu.info.pszi.api.controller;

import hu.info.pszi.api.exceptions.ResourceNotFoundException;
import hu.info.pszi.api.model.Version;
import hu.info.pszi.api.service.BaseService;
import org.springframework.http.ResponseEntity;

public abstract class BaseController {
    public abstract ResponseEntity<Version> getLatestVersion();

    public <T extends BaseService> ResponseEntity<Version> getLatestVersion(T service) {
        return service.getLatestVersion()
                .map(ResponseEntity::ok)
                .orElseThrow(ResourceNotFoundException::new);
    }
}
