package com.klef.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {
	
	@Id
	private long id;
	private String name;
	private String email;
	private int age;
	//Constructors
	public Student() {}
	
	public Student(long id,String name,String email,int age) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.age = age;
	}
	
	//Getters and Setters
	
	public long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	 public String getEmail() {
	        return email;
	    }
	    public void setEmail(String email) {
	        this.email = email;
	    }
	    
	    public int getAge() { return age; }
	    public void setAge(int age) { this.age = age; }

}
