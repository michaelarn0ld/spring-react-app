package com.capstone.facility.controllers;

import com.capstone.facility.services.UserClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/helloworld")
public class TestController {

    @Autowired
    private UserClient client;

    @GetMapping
    public ResponseEntity<?> helloworld(@RequestHeader("Authorization") String header) {
        if (header.length() < 8) {
            return new ResponseEntity<>("No token!", HttpStatus.OK);
        }
        Set<String> roles = client.getRolesFromToken(header.substring(7));
        if (roles.contains("ADMIN")) {
            return new ResponseEntity<>("Admins only club!", HttpStatus.OK);
        }
        return new ResponseEntity<>("You must be a use or a non-admin", HttpStatus.OK);
    }

}
