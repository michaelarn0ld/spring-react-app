package com.capstone.facility.services;

import com.capstone.facility.models.AppUser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserClient {

    private final RestTemplate restTemplate;

    public UserClient(RestTemplateBuilder restTemplateBuilder) {
        restTemplate = restTemplateBuilder
                .rootUri("http://" + System.getenv("USER_SERVICE_HOSTNAME") + ":8080")
                .setConnectTimeout(Duration.ofSeconds(2))
                .setReadTimeout(Duration.ofSeconds(2))
                .build();
    }

    public AppUser getRolesFromToken(String token) {
        JsonNode node = restTemplate.getForObject("/authenticate?jwt=" + token, JsonNode.class);
        if (node == null) {
            return null;
        }
        List<String> authorities = new ArrayList<>();
        node.get("authorityNames").iterator().forEachRemaining(a -> authorities.add(a.textValue()));
        AppUser user = new AppUser();
        user.setAuthorities(authorities);
        user.setUsername(node.get("username").textValue());
        user.setId(node.get("id").intValue());
        return user;
    }
}
