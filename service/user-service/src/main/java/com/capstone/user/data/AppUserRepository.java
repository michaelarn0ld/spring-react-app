package com.capstone.user.data;

import com.capstone.user.models.AppUser;

import java.util.List;

public interface AppUserRepository {

    List<AppUser> findAll();

    List<String> findRoles();

    AppUser findById(int id);

    AppUser findUser(String input);

    AppUser add(AppUser user);

    boolean changePassword(AppUser user);

    boolean update(AppUser user);

    boolean noDuplicateUsers(String username, String email);

}
