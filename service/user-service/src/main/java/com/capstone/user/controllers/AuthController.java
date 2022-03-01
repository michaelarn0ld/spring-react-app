package com.capstone.user.controllers;

import com.capstone.user.models.AppUser;
import com.capstone.user.security.JwtConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@ConditionalOnWebApplication
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtConverter converter;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping
    public ResponseEntity<Object> healthCheck() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody HashMap<String, String> credentials) {

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(credentials.get("username"),
                        credentials.get("password"));

        try {
            Authentication authentication = authenticationManager.authenticate(authToken);

            if (authentication.isAuthenticated()) {
                AppUser user = (AppUser) authentication.getPrincipal();
                String jwtToken = converter.getTokenFromUser(user);

                Map<String, String> map = new HashMap<>();
                map.put("jwt", jwtToken);

                return new ResponseEntity<>(map, HttpStatus.OK);
            }

        } catch (AuthenticationException ex) {
            System.out.println(ex);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@AuthenticationPrincipal AppUser principal) {

        String jwtToken = converter.getTokenFromUser(principal);
        Map<String, String> map = new HashMap<>();
        map.put("jwt", jwtToken);

        return new ResponseEntity<>(map, HttpStatus.OK);

    }

    @GetMapping("/authenticate")
    public AppUser authenticate(@RequestParam(name = "jwt", required = false) String jwt) {
        System.out.println(converter.getUserFromToken(jwt));
        return converter.getUserFromToken(jwt);
    }
}
