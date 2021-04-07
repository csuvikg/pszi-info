package hu.info.pszi.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Geocoding failed")
public class GeocodingFailedException extends RuntimeException {
}
