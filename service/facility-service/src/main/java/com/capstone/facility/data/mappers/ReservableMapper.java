package com.capstone.facility.data.mappers;

import com.capstone.facility.models.Reservable;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;


public class ReservableMapper implements RowMapper<Reservable> {

    @Override
    public Reservable mapRow(ResultSet rs, int rowNum) throws SQLException {
        Reservable reservable = new Reservable();
        reservable.setId(rs.getInt("id"));
        reservable.setName(rs.getString("reservable_name"));
        return reservable;
    }
}
