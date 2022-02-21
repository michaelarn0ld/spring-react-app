package com.capstone.user.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class AppUserTest {

    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
    AppUser user;

    @BeforeEach
    void setup() {
        user = new AppUser();
        user.setId(0);
        user.setMembershipId(1);
        user.setEmail("example@test.com");
        user.setUsername("thisisatesT123_");
        user.setPassword("$$R3gex$$");
        user.setFirstName("Example");
        user.setLastName("Test");
        user.setPhone("951-768-2490");
        user.setAddress("777 Lucky St");
        user.setCity("Georgetown");
        user.setState("TX");
        user.setZipCode("78626");
    }

    @Test
    void emptyAppUserShouldFail() {
        Set<ConstraintViolation<AppUser>> violations = validator.validate(new AppUser());

        // All should fail except "id" and "disabled"
        assertEquals(11, violations.size());
    }

    @Test
    void badIdUserShouldFail() {
        user.setId(-1);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "id"
        assertEquals(1, violations.size());
    }

    @Test
    void nullUsernameUserShouldFail() {
        user.setUsername(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "username"
        assertEquals(1, violations.size());
    }

    @Test
    void usernameLikeEmailShouldFail() {
        user.setUsername("binsh@bba.com");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "username"
        assertEquals(1, violations.size());
    }

    @Test
    void longUsernameUserShouldFail() {
        user.setUsername("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "username"
        assertEquals(1, violations.size());
    }

    @Test
    void shortUsernameUserShouldFail() {
        user.setUsername("x");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "username"
        assertEquals(1, violations.size());
    }

    @Test
    void blankEmailUserShouldFail() {
        user.setEmail("");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "email"
        assertEquals(1, violations.size());
    }

    @Test
    void nullEmailUserShouldFail() {
        user.setEmail(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "email"
        assertEquals(1, violations.size());
    }

    @Test
    void notEmailEmailUserShouldFail() {
        user.setEmail("exampletest.com");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "email"
        assertEquals(1, violations.size());
    }

    @Test
    void nullFirstNameUserShouldFail() {
        user.setFirstName(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "firstName"
        assertEquals(1, violations.size());
    }

    @Test
    void longFirstNameUserShouldFail() {
        user.setFirstName("Examplexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "firstName"
        assertEquals(1, violations.size());
    }

    @Test
    void shortFirstNameUserShouldFail() {
        user.setFirstName("E");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "firstName"
        assertEquals(1, violations.size());
    }

    @Test
    void nullLastNameUserShouldFail() {
        user.setLastName(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "lastName"
        assertEquals(1, violations.size());
    }

    @Test
    void longLastNameUserShouldFail() {
        user.setLastName("Testxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "lastName"
        assertEquals(1, violations.size());
    }

    @Test
    void shortLastNameUserShouldFail() {
        user.setLastName("T");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "lastName"
        assertEquals(1, violations.size());
    }

    @Test
    void nullPasswordUserShouldFail() {
        user.setPassword(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "password"
        assertEquals(1, violations.size());
    }

    @Test
    void longPasswordUserShouldFail() {
        user.setPassword("Z3tt3lL1f3$$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "password"
        assertEquals(1, violations.size());
    }

    @Test
    void unmatchedRegexPasswordUserShouldFail() {
        user.setPassword("regularexpression");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "password"
        assertEquals(1, violations.size());
    }

    @Test
    void badMembershipIdShouldFail() {
        user.setMembershipId(0);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "membershipId"
        assertEquals(1, violations.size());
    }

    @Test
    void badPhoneNumberShouldFail() {
        user.setPhone("XYZ-768-2490");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "phone"
        assertEquals(1, violations.size());
    }

    @Test
    void nullPhoneNumberShouldFail() {
        user.setPhone(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "phone"
        assertEquals(1, violations.size());
    }

    @Test
    void nullStateShouldFail() {
        user.setState(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "phone"
        assertEquals(1, violations.size());
    }

    @Test
    void badStateShouldFail() {
        user.setState("CALIFORNIA");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "phone"
        assertEquals(1, violations.size());
    }

    @Test
    void nullZipShouldFail() {
        user.setZipCode(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "phone"
        assertEquals(1, violations.size());
    }

    @Test
    void badZipShouldFail() {
        user.setZipCode("3485034958");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);

        // All are OK except "zipCode"
        assertEquals(1, violations.size());
    }

    @Test
    void goodUserShouldPass() {
        Set<ConstraintViolation<AppUser>> violations = validator.validate(user);
        assertEquals(0, violations.size());
    }

}