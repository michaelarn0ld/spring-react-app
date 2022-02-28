package com.capstone.facility.controllers;

import com.capstone.facility.domain.FacilityService;
import com.capstone.facility.domain.ReservableService;
import com.capstone.facility.domain.ReservationService;
import com.capstone.facility.models.Facility;
import com.capstone.facility.models.Reservation;
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

    @PostMapping("{facilityId}/{reservableId}")
    public ResponseEntity<?> test(@RequestBody Reservation reservation) {
        boolean canBeAdded = reservationService.requestedReservationAvailable(reservation);
        if (canBeAdded) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }
}
