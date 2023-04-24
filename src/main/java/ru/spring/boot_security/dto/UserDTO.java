package ru.spring.boot_security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.spring.boot_security.model.Role;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;
    @NotEmpty(message = "Имя не может быть пустым")
    @Size(min = 2, max = 27, message = "Имя не может быть короче 2 и больше 27 символов")
    private String username;
    @NotEmpty(message = "Пароль не может быть пустым")
    private String pass;

    private Set<Role> roleSet;
}
