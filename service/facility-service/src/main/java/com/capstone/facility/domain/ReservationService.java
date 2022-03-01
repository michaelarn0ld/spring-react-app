package com.capstone.facility.domain;

import com.capstone.facility.data.ReservationRepository;
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

    public Result<Reservation> add(Reservation reservation) {
        Result<Reservation> result = new Result<>();
        // if there is no available reservations for this date,time,facility,equipment
        if (!repository.requestedReservationAvailable(reservation)) {
            result.addMessage("No reservations available for the selected date, time, and equipment!", ResultType.INVALID);
            return result;
        }
        // if we have maxed out our reservations for the week
        if (repository.appUserReservationsExceeded(reservation)) {
            result.addMessage("User cannot make any more reservations this week!", ResultType.INVALID);
            return result;
        }
        result.setPayload(repository.add(reservation));
        return result;
    }
}
