package ru.spring.boot_security.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.spring.boot_security.dto.UserDTO;
import ru.spring.boot_security.model.User;
import ru.spring.boot_security.service.UserService;
import ru.spring.boot_security.util.UserErrorResponse;
import ru.spring.boot_security.util.UserNotCreatedException;
import ru.spring.boot_security.util.UserNotFoundException;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

    private final UserService userService;

    public RestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/people")
    public List<UserDTO> getUsers() {
        List<User> usersList = userService.getUsersList();
        List<UserDTO> UserDTOList = new ArrayList<>();
        for(User u : usersList) {
            UserDTOList.add(convertToUserDTO(u));
        }
        return UserDTOList;
    }

    @GetMapping("/people/{id}")
    public UserDTO getUser(@PathVariable("id") Long id) {
        return convertToUserDTO(userService.getUser(id));
    }

    @PostMapping("/people")
    public ResponseEntity<HttpStatus> addUser(@RequestBody @Valid UserDTO userDto,
                                              BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder();
            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError error : errors) {
                errorMsg.append(error.getField())
                        .append(" - ").append(error.getDefaultMessage())
                        .append(";");
                System.out.println(errorMsg);
                throw new UserNotCreatedException(errorMsg.toString());
            }
        }
        userService.add(convertToUser(userDto));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/authUser")
    public UserDTO getAuthUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return convertToUserDTO(user);
    }

    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handleException(UserNotFoundException ignored) {
        UserErrorResponse response = new UserErrorResponse(
                "Человек с таким айди не найден",
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handleNotCreatedException(UserNotCreatedException e) {
        UserErrorResponse response = new UserErrorResponse(
                e.getMessage(),
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    private User convertToUser(UserDTO userDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(userDto, User.class);
    }
    private UserDTO convertToUserDTO(User user) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(user, UserDTO.class);
    }


}
