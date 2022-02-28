package com.capstone.facility.data;

import com.capstone.facility.models.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository {
    List<Reservation> findByFacilityIdReservableIdDate(
            int facilityId,
            int reservableId,
            LocalDate date);

    Reservation add(Reservation reservation);

    boolean requestedReservationAvailable(Reservation reservation);
}
