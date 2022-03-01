package com.capstone.facility.models;

import lombok.Data;

import java.util.List;

@Data
public class AppUser {
    private int id;
    private String username;
    private List<String> authorities;

    public boolean hasRole(String role) {
        return authorities.stream()
                .filter(r -> r.equals(role))
                .toList()
                .size() > 0;
    }
}
