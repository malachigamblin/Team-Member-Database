INSERT INTO department (name)
VALUES  ('Sales'),
        ('Marketing'),
        ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Manager', 80000, 1),
        ('Sales Representative', 65000, 1),
        ('Marketing Manager', 75000, 2),
        ('Marketing Specialist', 60000, 2),
        ('Lead Engineer', 130000, 3),
        ('Software Engineer', 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 1, NULL),
        ('Jane', 'Smith', 2, 1),
        ('Tom', 'Ford', 3, NULL),
        ('Sarah', 'Lee', 4, 3),
        ('Mike', 'Conley', 5, NULL),
        ('Jon', 'Jones', 6, 5);