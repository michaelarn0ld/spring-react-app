package com.capstone.auth.controllers;

import com.capstone.auth.domain.AppUserService;
import com.capstone.auth.domain.Result;
import com.capstone.auth.models.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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
}
