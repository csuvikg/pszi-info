package hu.info.pszi.api.config;

import com.google.maps.GeoApiContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PreDestroy;

@Configuration
public class GeoApiConfig {
    @Value("${google-maps.geo-api-key}")
    private String geoApiKey;

    @Bean
    public GeoApiContext getGeoApiContext() {
        return new GeoApiContext.Builder()
                .apiKey(geoApiKey)
                .build();
    }

    @PreDestroy
    public void destroy() {
        getGeoApiContext().shutdown();
    }
}
