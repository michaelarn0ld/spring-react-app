package com.capstone.facility.controllers;

import com.capstone.facility.domain.ReservableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReservableController {

    @Autowired
    ReservableService service;

    @GetMapping("/{facilityId}")
    public ResponseEntity<?> findByFacilityId(@PathVariable int facilityId) {
        return new ResponseEntity<>(service.findByFacilityId(facilityId), HttpStatus.OK);
    }
}
