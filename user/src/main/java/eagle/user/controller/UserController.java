package eagle.user.controller;

import eagle.user.model.User;
import eagle.user.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    // 取得所有使用者
    @GetMapping
    public List<User> getAll() {
        return repository.findAll();
    }

    // 新增使用者
    @PostMapping
    public User create(@RequestBody User user) {
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
        existing.setPassword(user.getPassword());
        existing.setEmail(user.getEmail());
        return repository.save(existing);
    }

    // 刪除使用者
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}

