package com.capstone.auth.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class AppUserTest {

    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
    AppUser appUser;

    @BeforeEach
    void setup() {
        appUser = new AppUser();
        appUser.setId(0);
        appUser.setMembershipId(1);
        appUser.setEmail("example@test.com");
        appUser.setUsername("thisisatest");
        appUser.setPassword("$$R3gex$$");
        appUser.setFirstName("Example");
        appUser.setLastName("Test");
        appUser.setPhone("951-768-2490");
        appUser.setAddress("777 Lucky St");
        appUser.setCity("Georgetown");
        appUser.setState("TX");
        appUser.setZipCode("78626");
    }

    @Test
    void emptyAppUserShouldFail() {
        Set<ConstraintViolation<AppUser>> violations = validator.validate(new AppUser());

        // All should fail except "id" and "disabled"
        assertEquals(11, violations.size());
    }

    @Test
    void badIdUserShouldFail() {
        appUser.setId(-1);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "id"
        assertEquals(1, violations.size());
    }

    @Test
    void nullUsernameUserShouldFail() {
        appUser.setUsername(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "username"
        assertEquals(1, violations.size());
    }

    @Test
    void usernameLikeEmailShouldFail() {
        appUser.setUsername("binsh@bba.com");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "username"
        assertEquals(1, violations.size());
    }

    @Test
    void longUsernameUserShouldFail() {
        appUser.setUsername("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "username"
        assertEquals(1, violations.size());
    }

    @Test
    void shortUsernameUserShouldFail() {
        appUser.setUsername("x");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "username"
        assertEquals(1, violations.size());
    }

    @Test
    void blankEmailUserShouldFail() {
        appUser.setEmail("");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "email"
        assertEquals(1, violations.size());
    }

    @Test
    void nullEmailUserShouldFail() {
        appUser.setEmail(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "email"
        assertEquals(1, violations.size());
    }

    @Test
    void notEmailEmailUserShouldFail() {
        appUser.setEmail("exampletest.com");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "email"
        assertEquals(1, violations.size());
    }

    @Test
    void nullFirstNameUserShouldFail() {
        appUser.setFirstName(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "firstName"
        assertEquals(1, violations.size());
    }

    @Test
    void longFirstNameUserShouldFail() {
        appUser.setFirstName("Examplexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "firstName"
        assertEquals(1, violations.size());
    }

    @Test
    void shortFirstNameUserShouldFail() {
        appUser.setFirstName("E");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "firstName"
        assertEquals(1, violations.size());
    }

    @Test
    void nullLastNameUserShouldFail() {
        appUser.setLastName(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "lastName"
        assertEquals(1, violations.size());
    }

    @Test
    void longLastNameUserShouldFail() {
        appUser.setLastName("Testxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "lastName"
        assertEquals(1, violations.size());
    }

    @Test
    void shortLastNameUserShouldFail() {
        appUser.setLastName("T");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "lastName"
        assertEquals(1, violations.size());
    }

    @Test
    void nullPasswordUserShouldFail() {
        appUser.setPassword(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "password"
        assertEquals(1, violations.size());
    }

    @Test
    void longPasswordUserShouldFail() {
        appUser.setPassword("Z3tt3lL1f3$$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "password"
        assertEquals(1, violations.size());
    }

    @Test
    void unmatchedRegexPasswordUserShouldFail() {
        appUser.setPassword("regularexpression");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "password"
        assertEquals(1, violations.size());
    }

    @Test
    void badMembershipIdShouldFail() {
        appUser.setMembershipId(0);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "membershipId"
        assertEquals(1, violations.size());
    }

    @Test
    void badPhoneNumberShouldFail() {
        appUser.setPhone("XYZ-768-2490");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "phone"
        assertEquals(1, violations.size());
    }

    @Test
    void nullPhoneNumberShouldFail() {
        appUser.setPhone(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "phone"
        assertEquals(1, violations.size());
    }

    @Test
    void nullStateShouldFail() {
        appUser.setState(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "phone"
        assertEquals(1, violations.size());
    }

    @Test
    void badStateShouldFail() {
        appUser.setState("CALIFORNIA");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "phone"
        assertEquals(1, violations.size());
    }

    @Test
    void nullZipShouldFail() {
        appUser.setZipCode(null);
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "phone"
        assertEquals(1, violations.size());
    }

    @Test
    void badZipShouldFail() {
        appUser.setZipCode("3485034958");
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        // All are OK except "zipCode"
        assertEquals(1, violations.size());
    }

    @Test
    void goodUserShouldPass() {
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);
        assertEquals(0, violations.size());
    }

}