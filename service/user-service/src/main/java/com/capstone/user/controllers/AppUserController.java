package com.capstone.user.controllers;

import com.capstone.user.domain.AppUserService;
import com.capstone.user.domain.Result;
import com.capstone.user.models.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@ConditionalOnWebApplication
public class AppUserController {

    @Autowired
    private AppUserService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AppUser user) {
        Result<AppUser> result = service.add(user);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public List<AppUser> findAll() {
        List<AppUser> users = service.findAll();
        users.forEach(u -> u.setPassword(""));
        return users;
    }

    @GetMapping("/user/roles")
    public List<String> findRoles() {
        return service.findRoles();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        AppUser user = service.findById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        user.setPassword("");
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/user/update")
    public ResponseEntity<?> update(
            @RequestBody @Valid AppUser user,
            @AuthenticationPrincipal AppUser principal) {

        AppUser existing = service.findById(user.getId());
        if (existing == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (existing.isEnabled() && existing.hasAuthority("ADMIN")
        && existing.getId() != principal.getId()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Result<AppUser> result = service.update(user);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(
            @RequestBody Map<String, String> values,
            @AuthenticationPrincipal AppUser principal) {

        principal.setPassword(values.get("password"));

        Result<AppUser> result = service.changePassword(principal);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
