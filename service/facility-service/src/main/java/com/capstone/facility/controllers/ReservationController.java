package com.capstone.facility.controllers;

import com.capstone.facility.domain.FacilityService;
import com.capstone.facility.domain.ReservableService;
import com.capstone.facility.domain.ReservationService;
import com.capstone.facility.domain.Result;
import com.capstone.facility.models.AppUser;
import com.capstone.facility.models.Facility;
import com.capstone.facility.models.Reservation;
import com.capstone.facility.services.UserClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@RestController
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @Autowired
    ReservableService reservableService;

    @Autowired
    FacilityService facilityService;

    @Autowired
    UserClient client;

    @GetMapping("{facilityId}/{reservableId}")
    public ResponseEntity<?> findByFacilityIdReservableIdDate(
            @PathVariable int facilityId,
            @PathVariable int reservableId,
            @RequestParam(name = "date")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
            ) {

        Facility facility = facilityService.findById(facilityId);
        int available = reservableService.findReservableQuantityByFacility(facilityId,reservableId);

        Map<LocalTime, Integer> quantityReservedAtTime = new HashMap<>();
        List<Reservation> reservation = reservationService.findByFacilityIdReservableIdDate(facilityId, reservableId, date);
        reservation.forEach(r -> {
            quantityReservedAtTime.putIfAbsent(r.getStartTime().toLocalTime(), 0);
            quantityReservedAtTime.put(
                    r.getStartTime().toLocalTime(),
                    quantityReservedAtTime.get(r.getStartTime().toLocalTime()) + 1);
        });

        Map<LocalTime, Boolean> availability = new TreeMap<>();
        for (int i = 0; i < 24; ++i) {
            LocalTime time = LocalTime.of(i,0,0);
            boolean n =
                    (time.compareTo(facility.getOpen()) >= 0 && time.compareTo(facility.getClose()) < 0) &&
                    (quantityReservedAtTime.get(time) == null || quantityReservedAtTime.get(time) < available);
            availability.put(time, n);
        }
        return new ResponseEntity<>(availability, HttpStatus.OK);
    }

    @GetMapping("/reservations/{appUserId}")
    public ResponseEntity<?> findFutureReservationsByUserId(
            @RequestHeader("Authorization") String bearer,
            @PathVariable int appUserId
    ) {
        if (bearer.length() < 8) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        AppUser user = client.getRolesFromToken(bearer.substring(7));
        if (user == null || !user.hasRole("USER")
        || user.getId() != appUserId) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(reservationService.findFutureReservationsByUserId(appUserId),
                HttpStatus.OK);
    }

    @PostMapping("{facilityId}/{reservableId}")
    public ResponseEntity<?> add(
            @RequestHeader("Authorization") String bearer,
            @RequestBody Reservation reservation,
            @PathVariable int facilityId,
            @PathVariable int reservableId) {

        if (bearer.length() < 8) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        AppUser user = client.getRolesFromToken(bearer.substring(7));
        if (user == null || !user.hasRole("USER")) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        if (facilityId != reservation.getFacility().getId() ||
        reservableId != reservation.getReservable().getId()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Result<Reservation> result = reservationService.add(reservation);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/reservations/{appUserId}/{reservationId}")
    public ResponseEntity<?> deleteById(
            @RequestHeader("Authorization") String bearer,
            @PathVariable int appUserId,
            @PathVariable int reservationId
    ) {
        if (bearer.length() < 8) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        AppUser user = client.getRolesFromToken(bearer.substring(7));
        if (user == null || !user.hasRole("USER")
                || user.getId() != appUserId) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        if (reservationService.deleteById(reservationId, user.getId())) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
