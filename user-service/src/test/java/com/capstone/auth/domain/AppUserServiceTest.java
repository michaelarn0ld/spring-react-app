package com.capstone.auth.domain;

import com.capstone.auth.data.AppUserRepository;
import com.capstone.auth.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AppUserServiceTest {

    @MockBean
    AppUserRepository repository;

    @Autowired
    AppUserService service;

    AppUser userIn;
    AppUser userOut;
    AppUser userPull;

    @BeforeEach
    void setup() {
        userIn = new AppUser();
        userIn.setId(0);
        userIn.setMembershipId(1);
        userIn.setEmail("example@test.com");
        userIn.setUsername("thisisatesT123_");
        userIn.setPassword("$$R3gex$$");
        userIn.setFirstName("Example");
        userIn.setLastName("Test");
        userIn.setPhone("951-768-2490");
        userIn.setAddress("777 Lucky St");
        userIn.setCity("Georgetown");
        userIn.setState("TX");
        userIn.setZipCode("78626");

        userOut = new AppUser();
        userOut.setId(1);
        userOut.setMembershipId(1);
        userOut.setEmail("example@test.com");
        userOut.setUsername("thisisatesT123_");
        userOut.setPassword("$$R3gex$$");
        userOut.setFirstName("Example");
        userOut.setLastName("Test");
        userOut.setPhone("951-768-2490");
        userOut.setAddress("777 Lucky St");
        userOut.setCity("Georgetown");
        userOut.setState("TX");
        userOut.setZipCode("78626");

        userPull = new AppUser();
        userPull.setId(0);
        userPull.setMembershipId(1);
        userPull.setEmail("example@test.com");
        userPull.setUsername("thisisatesT123_");
        userPull.setPassword("$$R3gex$$");
        userPull.setFirstName("Example");
        userPull.setLastName("Test");
        userPull.setPhone("951-768-2490");
        userPull.setAddress("777 Lucky St");
        userPull.setCity("Georgetown");
        userPull.setState("TX");
        userPull.setZipCode("78626");
    }

    @Test
    void shouldFindAll() {
        when(repository.findAll()).thenReturn(List.of(
                new AppUser(),
                new AppUser(),
                new AppUser()
        ));

        assertEquals(3, service.findAll().size());
    }

    @Test
    void shouldAdd() {
        when(repository.add(userIn)).thenReturn(userOut);
        when(repository.noDuplicateUsers(anyString(), anyString())).thenReturn(true);

        Result<AppUser> result = service.add(userIn);

        assertTrue(result.isSuccess());
        assertEquals(userOut, result.getPayload());
    }

    @Test
    void shouldNotAddOneValidationFails() {
        userIn.setPassword("badpassword");
        Result<AppUser> result = service.add(userIn);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotAddMultipleValidationFails() {
        userIn.setPassword("badpassword");
        userIn.setState("Texas");
        userIn.setUsername("%bad_userName$$$");
        when(repository.noDuplicateUsers(anyString(), anyString())).thenReturn(true);

        Result<AppUser> result = service.add(userIn);
        assertFalse(result.isSuccess());
        assertEquals(3, result.getMessages().size());
    }

    @Test
    void shouldNotAddDuplicateUsernameOrEmail() {
        when(repository.noDuplicateUsers(anyString(), anyString())).thenReturn(false);

        Result<AppUser> result = service.add(userIn);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

    @Test
    void shouldUpdate() {
        when(repository.findUser(anyString())).thenReturn(userPull);
        when(repository.update(any())).thenReturn(true);

        userIn.setUsername("billybob123");
        Result<AppUser> result = service.update(userIn);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotUpdateToExistingUsernameDifferentUserId() {
        when(repository.findUser(anyString())).thenReturn(userOut);

        Result<AppUser> result = service.update(userIn);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

}