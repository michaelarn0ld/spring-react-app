package com.capstone.facility.domain;

import com.capstone.facility.data.ReservationRepository;
import com.capstone.facility.models.Reservable;
import com.capstone.facility.models.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    ReservationRepository repository;

    public List<Reservation> findByFacilityIdReservableIdDate(
            int facilityId,
            int reservableId,
            LocalDate date) {
        return repository.findByFacilityIdReservableIdDate(facilityId, reservableId, date);
    }

    public Reservation add(Reservation reservation) {
        if (!repository.requestedReservationAvailable(reservation)) {
            return null;
        }
        return repository.add(reservation);
    }
}
