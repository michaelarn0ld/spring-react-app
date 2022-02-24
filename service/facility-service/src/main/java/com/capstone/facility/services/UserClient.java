package com.capstone.facility.services;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserClient {

    private final RestTemplate restTemplate;

    public UserClient(RestTemplateBuilder restTemplateBuilder) {
        restTemplate = restTemplateBuilder
                .rootUri("http://" + System.getenv("HOST") + "8080")
                .setConnectTimeout(Duration.ofSeconds(2))
                .setReadTimeout(Duration.ofSeconds(2))
                .build();
    }

    public Set<String> getRolesFromToken(String token) {
        String[] roles = restTemplate.getForObject("/authenticate?jwt=" + token, String[].class);
        return Arrays.stream(roles).collect(Collectors.toSet());
    }
}
