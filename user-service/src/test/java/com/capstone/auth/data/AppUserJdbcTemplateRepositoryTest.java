package com.capstone.auth.data;

import com.capstone.auth.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AppUserJdbcTemplateRepositoryTest {

    @Autowired
    AppUserRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<AppUser> users = repository.findAll();
        assertTrue(users.size() >= 3);
    }

    @Test
    void shouldFindAllRoles() {
        List<String> roles = repository.findRoles();
        assertEquals(2, roles.size());
        assertTrue(roles.containsAll(List.of("USER", "ADMIN")));
    }

    @Test
    void shouldFindById() {
       AppUser user = repository.findById(2);
       assertNotNull(user);
       assertEquals("example123", user.getUsername());
    }

    @Test
    void shouldNotFindByBadId() {
        AppUser user = repository.findById(22);
        assertNull(user);
    }

    @Test
    void shouldFindDuplicateUserByEmail() {
        assertFalse(repository.noDuplicateUsers("michaelarnold", "me@michaelarnold.io"));
    }

    @Test
    void shouldFindDuplicateUserByUsername() {
        assertFalse(repository.noDuplicateUsers("michaelarn0ld", "me2@michaelarnold.io"));
    }

    @Test
    void shouldNotFindDuplicateUser() {
        assertTrue(repository.noDuplicateUsers("michaelarnold", "me2@michaelarnold.io"));
    }

    @Test
    void shouldFindByUsername() {
        AppUser user = repository.findUser("michaelarn0ld");
        assertEquals("michaelarn0ld", user.getUsername());
        assertEquals("me@michaelarnold.io", user.getEmail());
    }

    @Test
    void shouldFindByEmail() {
        AppUser user = repository.findUser("me@michaelarnold.io");
        assertEquals("michaelarn0ld", user.getUsername());
        assertEquals("me@michaelarnold.io", user.getEmail());
    }

    @Test
    void shouldNotFindBadUsername() {
        AppUser user = repository.findUser("notmichaelarn0ld");
        assertNull(user);
    }

    @Test
    void shouldNotFindBadEmail() {
        AppUser user = repository.findUser("notme@michaelarnold.io");
        assertNull(user);
    }

    @Test
    void shouldAddUser() {
        AppUser user = new AppUser();
        user.setMembershipId(1);
        user.setEmail("newuser@test.com");
        user.setUsername("thisisatest");
        user.setPassword("$$R3gex$$");
        user.setFirstName("Example");
        user.setLastName("Test");
        user.setPhone("951-768-2490");
        user.setAddress("787 Lucky St");
        user.setCity("Georgetown");
        user.setState("TX");
        user.setZipCode("78626");

        AppUser result = repository.add(user);
        assertNotNull(result);
        assertEquals(4, result.getId());
    }

    @Test
    void shouldNotAddDuplicateUsername() {
        AppUser user = new AppUser();
        user.setMembershipId(1);
        user.setEmail("newuser@test.com");
        user.setUsername("michaelarn0ld");
        user.setPassword("$$R3gex$$");
        user.setFirstName("Example");
        user.setLastName("Test");
        user.setPhone("951-768-2490");
        user.setAddress("787 Lucky St");
        user.setCity("Georgetown");
        user.setState("TX");
        user.setZipCode("78626");

        assertThrows(DuplicateKeyException.class, () -> repository.add(user));
    }

    @Test
    void shouldNotAddDuplicateEmail() {
        AppUser user = new AppUser();
        user.setMembershipId(1);
        user.setEmail("me@michaelarnold.io");
        user.setUsername("thisisatest");
        user.setPassword("$$R3gex$$");
        user.setFirstName("Example");
        user.setLastName("Test");
        user.setPhone("951-768-2490");
        user.setAddress("787 Lucky St");
        user.setCity("Georgetown");
        user.setState("TX");
        user.setZipCode("78626");

    }

    @Test
    void shouldNotAddBadUser() {
        AppUser user = new AppUser();
        assertThrows(DataIntegrityViolationException.class, () -> repository.add(user));
    }

    @Test
    void shouldUpdateUser() {
       AppUser user = repository.findUser("example123");
       user.setUsername("michael");
       assertTrue(repository.update(user));
       AppUser result = repository.findUser("example@test.com");
       assertEquals("michael", result.getUsername());
    }

    @Test
    void shouldNotUpdateBadUser() {
        AppUser user = new AppUser();
        user.setUsername("myusername");
        assertFalse(repository.update(user));
    }

    @Test
    void shouldChangePassword() {
       AppUser user = new AppUser();
       user.setId(1);
       user.setPassword("MYNEWPASSWORD");

       assertTrue(repository.changePassword(user));
       assertEquals("MYNEWPASSWORD", repository.findUser("me@michaelarnold.io").getPassword());
    }

    @Test
    void shouldNotChangePassword() {
        AppUser user = new AppUser();
        user.setPassword("MYNEWPASSWORD");

        assertFalse(repository.changePassword(user));
    }

}