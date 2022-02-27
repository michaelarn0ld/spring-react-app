package com.capstone.facility.data.mappers;

import com.capstone.facility.models.Reservation;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class ReservationMapper implements RowMapper<Reservation> {

    @Override
    public Reservation mapRow(ResultSet rs, int rowNum) throws SQLException {
        Reservation reservation = new Reservation();
        reservation.setId(rs.getInt("id"));
        reservation.setAppUserId(rs.getInt("app_user_id"));
        reservation.setEquipmentId(rs.getInt("equipment_id"));
        reservation.setStartTime(rs.getObject("start_time", LocalDateTime.class));
        reservation.setEndTime(rs.getObject("end_time", LocalDateTime.class));
        return reservation;
    }
}
