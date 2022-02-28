package com.capstone.facility.data;

import com.capstone.facility.data.mappers.ReservationMapper;
import com.capstone.facility.models.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Repository
public class ReservationJdbcTemplateRepository implements ReservationRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<Reservation> findByFacilityIdReservableIdDate(
            int facilityId,
            int reservableId,
            LocalDate date) {
        final String sql = "SELECT r.id, r.app_user_id, r.equipment_id, "
                + "r.start_time, r.end_time "
                + "FROM reservation r "
                + "INNER JOIN equipment e ON r.equipment_id = e.id "
                + "INNER JOIN facility f ON f.id = e.facility_id "
                + "INNER JOIN reservable rb ON rb.id = e.reservable_id "
                + "WHERE r.start_time::date = ? "
                + "AND f.id = ? "
                + "AND rb.id = ?;";

        List<Reservation> reservations = jdbcTemplate.query(
                sql, new ReservationMapper(), date, facilityId, reservableId);

        if (reservations.size() == 0) {
            return reservations;
        }

        reservations.forEach(r -> {
            addFacility(r);
            addReservable(r);
        });

        return reservations;
    }

    @Override
    @Transactional
    public Reservation add(Reservation reservation) {
        final String getEquipmentId = "SELECT id FROM equipment "
                + "WHERE facility_id = ? "
                + "AND reservable_id = ? "
                + "AND id NOT IN ("
                + "SELECT e.id FROM reservation r "
                + "INNER JOIN equipment e ON e.id = r.equipment_id "
                + "WHERE e.facility_id = ? AND e.reservable_id = ? "
                + "AND r.start_time = ?)"
                + "LIMIT 1;";

        int equipmentId =  jdbcTemplate.query(getEquipmentId, (rs,i) -> rs.getInt("id"),
                reservation.getFacility().getId(),
                reservation.getReservable().getId(),
                reservation.getFacility().getId(),
                reservation.getReservable().getId(),
                reservation.getStartTime()).get(0);

        reservation.setEquipmentId(equipmentId);

        final String addReservation = "INSERT INTO reservation (equipment_id, app_user_id, start_time, end_time) "
                + "VALUES (?, ?, ?, ?);";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(addReservation, new String[]{ "id" });
            ps.setInt(1, reservation.getEquipmentId());
            ps.setInt(2, reservation.getAppUserId());
            ps.setTimestamp(3, Timestamp.valueOf(reservation.getStartTime()));
            ps.setTimestamp(4, Timestamp.valueOf(reservation.getEndTime()));
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        reservation.setId(keyHolder.getKey().intValue());
        return reservation;
    }

    @Override
    public boolean requestedReservationAvailable(Reservation reservation) {
        final String sql = "SELECT id FROM equipment "
                + "WHERE facility_id = ? "
                + "AND reservable_id = ? "
                + "AND id NOT IN ("
                    + "SELECT e.id FROM reservation r "
                    + "INNER JOIN equipment e ON e.id = r.equipment_id "
                    + "WHERE e.facility_id = ? AND e.reservable_id = ? "
                    + "AND r.start_time = ?)"
                + "LIMIT 1;";
        return jdbcTemplate.query(sql, (rs,i) -> rs.getInt("id"),
                reservation.getFacility().getId(),
                reservation.getReservable().getId(),
                reservation.getFacility().getId(),
                reservation.getReservable().getId(),
                reservation.getStartTime()).size() > 0;
    }

    private void addFacility(Reservation reservation) {

    }

    private void addReservable(Reservation reservation) {

    }
}
