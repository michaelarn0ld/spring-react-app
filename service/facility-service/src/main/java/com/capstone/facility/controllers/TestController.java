package com.capstone.facility.controllers;

import com.capstone.facility.domain.ReservableService;
import com.capstone.facility.domain.ReservationService;
import com.capstone.facility.models.Reservation;
import com.capstone.facility.services.UserClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/helloworld")
public class TestController {

    @Autowired
    private UserClient client;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ReservableService service;

    @GetMapping("/{id}")
    public ResponseEntity<?> reservables(@RequestHeader("Authorization") String header, @PathVariable int id) {
        if (header.length() < 8) {
            return new ResponseEntity<>("No token!", HttpStatus.OK);
        }
        Set<String> roles = client.getRolesFromToken(header.substring(7));
        if (roles.contains("ADMIN")) {
            return new ResponseEntity<>(service.findByFacilityId(id), HttpStatus.OK);
        }
        return new ResponseEntity<>("You must be a non-user or a non-admin", HttpStatus.OK);
    }

    @GetMapping("/{fid}/{rid}")
    public ResponseEntity<?> reservations(@PathVariable int fid, @PathVariable int rid) {
        LocalDate test = LocalDate.of(2022,2,22);
        List<Reservation> reservation = reservationService.findByFacilityIdReservableIdDate(fid, rid, test);
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

}
