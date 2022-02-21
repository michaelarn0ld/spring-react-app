package com.capstone.user.data.mappers;

import com.capstone.user.models.AppUser;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AppUserMapper implements RowMapper<AppUser> {
    @Override
    public AppUser mapRow(ResultSet rs, int rowNum) throws SQLException {
        AppUser appUser = new AppUser();
        appUser.setId(rs.getInt("id"));
        appUser.setMembershipId(rs.getInt("membership_id"));
        appUser.setEmail(rs.getString("email"));
        appUser.setUsername(rs.getString("username"));
        appUser.setPassword(rs.getString("password_hash"));
        appUser.setFirstName(rs.getString("first_name"));
        appUser.setLastName(rs.getString("last_name"));
        appUser.setPhone(rs.getString("phone"));
        appUser.setAddress(rs.getString("address"));
        appUser.setCity(rs.getString("city"));
        appUser.setState(rs.getString("state"));
        appUser.setZipCode(rs.getString("zip_code"));
        appUser.setDisabled(rs.getBoolean("disabled"));
        return appUser;
    }
}
