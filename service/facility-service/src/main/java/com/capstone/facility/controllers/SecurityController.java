package com.capstone.facility.controllers;

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@ConditionalOnWebApplication
public class SecurityController {

    public static boolean authenticate(@RequestBody HashMap<String, String> credentials) {

    }
}
