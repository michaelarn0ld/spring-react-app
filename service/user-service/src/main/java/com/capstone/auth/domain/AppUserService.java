package com.capstone.auth.domain;

import com.capstone.auth.data.AppUserRepository;
import com.capstone.auth.models.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Set;

@Service
public class AppUserService {

    @Autowired
    private AppUserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    public Result<AppUser> add(AppUser user) {

        Result<AppUser> result = new Result<>();
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        if (!violations.isEmpty()) {
            violations.forEach(v -> result.addErrorMessage(v.getMessage()));
            return result;
        }

        user.setPassword(encoder.encode(user.getPassword()));
        result.setPayload(repository.add(user));
        return result;
    }
}
