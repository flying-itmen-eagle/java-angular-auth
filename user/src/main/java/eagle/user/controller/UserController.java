package eagle.user.controller;

import eagle.user.model.User;
import eagle.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    // 取得所有使用者
    @GetMapping
    public List<User> getAll() {
        return repository.findAll();
    }

    // 新增使用者
    @PostMapping
    public User create(@RequestBody User user) {
        // 加密密碼
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }

    // 取得單一使用者
    @GetMapping("/{id}")
    public User getOne(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    // 更新使用者
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        User existing = repository.findById(id).orElseThrow();
        existing.setUserName(user.getUserName());
        // 如果有傳入新密碼，才進行更新並加密
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existing.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        existing.setEmail(user.getEmail());
        return repository.save(existing);
    }

    // 刪除使用者
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
