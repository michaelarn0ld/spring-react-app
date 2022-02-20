package com.capstone.auth.domain;

import com.capstone.auth.data.AppUserRepository;
import com.capstone.auth.models.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AppUserService {

    @Autowired
    private AppUserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    public List<AppUser> findAll() {
        return repository.findAll();
    }

    public List<String> findRoles() {
        return repository.findRoles();
    }

    public AppUser findById(int id) {
        return repository.findById(id);
    }

    public Result<AppUser> add(AppUser user) {
        Result<AppUser> result = new Result<>();

        if (!repository.noDuplicateUsers(user.getUsername(), user.getEmail())) {
            result.addErrorMessage("Duplicate email or username");
            return result;
        }

        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        if (!violations.isEmpty()) {
            violations.forEach(v -> result.addErrorMessage(v.getMessage()));
            return result;
        }

        user.setPassword(encoder.encode(user.getPassword()));
        result.setPayload(repository.add(user));
        return result;
    }

    public Result<AppUser> update(AppUser user) {
        Result<AppUser> result = new Result<>();

        /*
        If there is a user with THIS username and DIFFERENT id
        OR
        If there is a user with THIS email and DIFFERENT id
        THEN
        We cannot update with THIS user data because it contains duplicate data
         */
        if (repository.findUser(user.getUsername()) != null
                && repository.findUser(user.getUsername()).getId() != user.getId()
                || repository.findUser(user.getEmail()) != null
                && repository.findUser(user.getEmail()).getId() != user.getId()) {
            result.addErrorMessage("Duplicate email or username");
            return result;
        }

        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        if (!violations.isEmpty()) {
            violations.forEach(v -> result.addErrorMessage(v.getMessage()));
            return result;
        }
        user.setPassword(encoder.encode(user.getPassword()));
        if (!repository.update(user)) {
            result.addErrorMessage("User not updated");
        }

        return result;

    }

    public Result<AppUser> changePassword(AppUser user) {
        Result<AppUser> result = new Result<>();

        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);
        violations = violations.stream()
                .filter(v -> v.getPropertyPath().toString().equals("id")
                             || v.getPropertyPath().toString().equals("password"))
                .collect(Collectors.toSet());

        if (!violations.isEmpty()) {
            violations.forEach(v -> result.addErrorMessage(v.getMessage()));
            return result;
        }
        user.setPassword(encoder.encode(user.getPassword()));
        if (!repository.changePassword(user)) {
            result.addErrorMessage("User password not changed");
        }

        return result;
    }
}
