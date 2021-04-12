package hu.info.pszi.api.controller;

import hu.info.pszi.api.exceptions.ResourceNotFoundException;
import hu.info.pszi.api.model.Version;
import hu.info.pszi.api.model.provider.Provider;
import hu.info.pszi.api.service.GeocodingService;
import hu.info.pszi.api.service.ProviderService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;
import java.util.stream.StreamSupport;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProviderControllerTest {
    @Mock
    private ProviderService providerService;

    @Mock
    private GeocodingService geocodingService;

    @InjectMocks
    private ProviderController providerController;

    @Test
    void findAllProviders_whenEmpty() {
        when(providerService.listProviders()).thenReturn(Collections.emptyList());

        ResponseEntity<Iterable<Provider>> response = providerController.findAllProviders();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, StreamSupport.stream(response.getBody().spliterator(), false).count());
    }

    @Test
    void findAllProviders_whenNotEmpty() {
        when(providerService.listProviders()).thenReturn(List.of(new Provider(), new Provider()));

        ResponseEntity<Iterable<Provider>> response = providerController.findAllProviders();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, StreamSupport.stream(response.getBody().spliterator(), false).count());
    }

    @Test
    void findProviderById_whenNonexistent() {
        when(providerService.findProviderById(anyInt())).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> providerController.findProviderById(1));
    }

    @Test
    void createProvider() {
    }

    @Test
    void deleteProviderById() {
    }

    @Test
    void getLatestVersion_whenAvailable() {
        long version = 1618244153;
        when(providerService.getLatestVersion()).thenReturn(Optional.of(new Version(version)));

        ResponseEntity<Version> response = providerController.getLatestVersion();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(version, response.getBody().getVersion());
    }

    @Test
    void getLatestVersion_whenUnavailable() {
        when(providerService.getLatestVersion()).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> providerController.getLatestVersion());
    }
}