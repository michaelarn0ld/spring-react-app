package com.capstone.auth.data;

import com.capstone.auth.data.mappers.AppUserMapper;
import com.capstone.auth.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository {

    private final JdbcTemplate jdbcTemplate;


    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public AppUser findUser(String input) {
        final String sql = "SELECT * FROM app_user WHERE username = ? OR email = ?;";

        AppUser appUser = jdbcTemplate.query(sql, new AppUserMapper(), input, input).stream()
                .findFirst()
                .orElse(null);

        if (appUser != null) {
            appUser.setAuthorityNames(getAuthorities(appUser.getId()));
        }

        return appUser;
    }

    @Override
    public AppUser add(AppUser appUser) {
        final String sql = "INSERT INTO app_user (membership_id, email, username, password_hash, first_name, " +
                "last_name, phone, address, city, state, zip_code) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, new String[]{ "id" });
            ps.setInt(1, appUser.getMembershipId());
            ps.setString(2, appUser.getEmail());
            ps.setString(3, appUser.getUsername());
            ps.setString(4, appUser.getPassword());
            ps.setString(5, appUser.getFirstName());
            ps.setString(6, appUser.getLastName());
            ps.setString(7, appUser.getPhone());
            ps.setString(8, appUser.getAddress());
            ps.setString(9, appUser.getCity());
            ps.setString(10, appUser.getState());
            ps.setString(11, appUser.getZipCode());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        appUser.setId(keyHolder.getKey().intValue());
        return appUser;
    }

    @Override
    public boolean update(AppUser appUser) {
        return false;
    }

    private void setAuthorities(AppUser appUser) {
        jdbcTemplate.update("DELETE FROM app_user_role WHERE app_user_id = ?;", appUser.getId());

        for (String authority : appUser.getAuthorityNames()) {

            String sql = "INSERT INTO app_user_role (app_user_id, app_role_id) "
                    + "VALUES (?, (SELECT id FROM app_role WHERE app_role_name = ?));";

            jdbcTemplate.update(sql, appUser.getId(), authority);
        }
    }

    private List<String> getAuthorities(int id) {
        final String sql = "SELECT r.app_role_name FROM app_user_role ar INNER JOIN app_role r ON "
                + "r.id = ar.app_role_id WHERE ar.app_user_id = ?;";

        return jdbcTemplate.query(sql,
                (rs, i) -> rs.getString("app_role_name"), id);
    }

}
