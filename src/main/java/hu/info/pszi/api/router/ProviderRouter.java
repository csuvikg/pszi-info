package hu.info.pszi.api.router;

import hu.info.pszi.api.handler.ProviderHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.*;

@Configuration
public class ProviderRouter {
    @Bean
    public RouterFunction<ServerResponse> route(ProviderHandler handler) {
        return RouterFunctions
                .route(RequestPredicates
                        .GET("/providers")
                        .and(RequestPredicates.accept(MediaType.APPLICATION_JSON)), handler::findAllProviders);
    }
}
