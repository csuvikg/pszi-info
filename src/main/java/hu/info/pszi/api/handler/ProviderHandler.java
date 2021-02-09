package hu.info.pszi.api.handler;

import hu.info.pszi.api.model.Provider;
import hu.info.pszi.api.repository.ProviderRepository;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class ProviderHandler {
    final ProviderRepository repository;

    public ProviderHandler(ProviderRepository repository) {
        this.repository = repository;
    }

    public Mono<ServerResponse> findAllProviders(ServerRequest request) {
        return ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(repository.findAll(), Provider.class);
    }
}
