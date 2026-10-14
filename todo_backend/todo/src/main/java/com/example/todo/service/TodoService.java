package com.example.todo.service;

import com.example.todo.dto.TodoRequest;
import com.example.todo.exception.ResourceNotFoundException;
import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository repository;

    public TodoService(TodoRepository repository){
        this.repository = repository;
    }

    public List<Todo> getAllTodos(){
        return repository.findAll();
    }

    public Todo getTodoById(long id){
        Todo todo = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: "+ id));
        return todo;
    }

    public Todo createTodo(TodoRequest request){
        Todo todo = Todo.builder()
                .title(request.getTitle())
                .build();

        if(request.getCompleted() != null){
            todo.setCompleted(request.getCompleted());
        }
        return repository.save(todo);
    }

    public Todo updateTodo(long id, TodoRequest request){
        Todo todo = getTodoById(id);
        todo.setTitle(request.getTitle());

        if(request.getCompleted() != null){
            todo.setCompleted(request.getCompleted());
        }

        return repository.save(todo);
    }

    public void deleteById(Long id){
        Todo todo = getTodoById(id);
        repository.delete(todo);
    }
}
