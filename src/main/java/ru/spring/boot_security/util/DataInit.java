package ru.spring.boot_security.util;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.spring.boot_security.model.Role;
import ru.spring.boot_security.model.User;
import ru.spring.boot_security.service.RoleService;
import ru.spring.boot_security.service.UserService;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class DataInit {

    private final UserService userService;
    private final RoleService roleService;

    public DataInit(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    @Transactional
    @PostConstruct
    protected void CreateAdmin() {
        Set<Role> roleSet = Set.of(new Role("ROLE_ADMIN", "ADMIN"), new Role("ROLE_USER", "USER"));
        for(Role r: roleSet){
            roleService.add(r);
        }
        Set<String> roleNameSet = Set.of("ROLE_ADMIN", "ROLE_USER");
        userService.add(new User("Admin", "12345"), roleNameSet);
    }
}
