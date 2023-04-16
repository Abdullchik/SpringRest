package ru.spring.boot_security.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.spring.boot_security.model.User;
import ru.spring.boot_security.service.UserService;
import ru.spring.boot_security.util.RolesValidator;
import ru.spring.boot_security.util.UserNameValidator;

import javax.validation.Valid;
import java.util.Set;


@RequestMapping("/admin")
@Controller
public class AdminController {

    private final UserNameValidator userNameValidator;
    private final RolesValidator rolesValidator;
    private final UserService userService;

    public AdminController(UserNameValidator userNameValidator, RolesValidator rolesValidator, UserService userService) {
        this.userNameValidator = userNameValidator;
        this.rolesValidator = rolesValidator;
        this.userService = userService;
    }

    @GetMapping()
    public String viewUsers(Model model) {
        model.addAttribute("usersList", userService.getUsersList());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        model.addAttribute("user", user);
        model.addAttribute("addUser", new User());
        model.addAttribute("updateUser", new User());
        return "main";
    }

    @GetMapping("/addUserPage")
    public String addUserPage(@ModelAttribute User addUser) {
        return "addUserPage";
    }

    @PostMapping("/createUser")
    public String createUser(@ModelAttribute @Valid User addUser, BindingResult bindingResult,
                             @RequestParam(value = "role[]", required = false) String[] roleNameSet) {
        userNameValidator.validate(addUser, bindingResult);
        rolesValidator.validate(roleNameSet, bindingResult);
        if (bindingResult.hasErrors()) {
            return "main";
        }
        userService.add(addUser, Set.of(roleNameSet));
        return "redirect:/admin";
    }

    @GetMapping("/updateUserPage")
    public String updateUserPage(@ModelAttribute User user) {
        return "updateUserPage";
    }

    @PatchMapping("/updateUser")
    public String updateUser(@ModelAttribute @Valid User user, BindingResult bindingResult,
                             @RequestParam(value = "role[]", required = false) String[] roleNameSet) {
        rolesValidator.validate(roleNameSet, bindingResult);
        if (bindingResult.hasErrors()) {
            return "updateUserPage";
        }
        userService.update(user, Set.of(roleNameSet));
        return "redirect:/admin";
    }

    @GetMapping("/deleteUserPage")
    public String deleteUserPage() {
        return "deleteUserPage";
    }

    @DeleteMapping("/deleteUser")
    public String deleteUser(Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }
}