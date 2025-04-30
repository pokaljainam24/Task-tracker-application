const User = require("../model/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Task = require("../model/taskModel");
const Project = require("../model/projectModel");
require('dotenv').config();



// ----------------------------------------------- Open register page
module.exports.openRegisterPage = (req, res) => {
    return res.render('admin/registerForm');
};


// ------------------------------------------------Register user
module.exports.registerUser = async (req, res) => {
    const { username, email, password, country } = req.body;

    try {
        const userInDb = await User.findOne({ email: email.toLowerCase() });

        if (userInDb) {
            console.log("User already exists");
            return res.redirect("/registerForm");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email: email.toLowerCase(), password: hashedPassword, country });

        console.log("User registered successfully");
        return res.redirect("/loginForm");
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send("Internal Server Error");
    }
};


// ----------------------------------------------- Open login page
module.exports.openloginPage = (req, res) => {
    return res.render('admin/loginForm');
};


// --------------------------------------------- Login user
module.exports.loginUser = async (req, res) => {
    try {
        console.log("Login attempt for:", req.body.email);
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            console.log("User not found");
            return res.redirect('/loginForm');
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return res.redirect('/loginForm');
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: "user"
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token);
        console.log("Login successful");
        return res.redirect('/');
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).send("Internal Server Error");
    }
};


// ----------------------------------------------- Open home page
module.exports.OpenhomePage = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        return res.render('index', { tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).send("Internal Server Error");
    }
};


// ----------------------------------------------- Open task form
module.exports.opentaskForm = (req, res) => {
    return res.render('admin/taskForm');
}


// ----------------------------------------------- Create task
module.exports.createTask = async (req, res) => {
    const { title, description, status, createdAt, completedAt } = req.body;

    try {
        const newProject = await Task.create({ title, description, status, createdAt, completedAt, user: req.user.id });
        console.log("Task created successfully:", newProject);
        return res.redirect('/');
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).send("Internal Server Error");
    }
}


// ----------------------------------------------- View tasks
module.exports.viewTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        return res.render('admin/viewTasks', { tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).send("Internal Server Error");
    }
};


// ----------------------------------------------- Open edit task form
module.exports.openEditTaskForm = async (req, res) => {
    const { id } = req.params;
    console.log("Task ID received:", id);
    try {
        const taskToedit = await Task.findById(id);

        if (!taskToedit) {
            console.log("Task not found");
            return res.status(404).send("Task not found");
        }

        return res.render('admin/editTaskForm', { taskToedit });
    } catch (error) {
        console.error("Error fetching task:", error);
        return res.status(500).send("Internal Server Error");
    }
};


// ----------------------------------------------- Update task
module.exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, createdAt, completedAt } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status, createdAt, completedAt }, { new: true });

        if (!updatedTask) {
            return res.status(404).send("Task not found");
        }

        console.log("Task updated successfully:", updatedTask);
        return res.redirect('/viewTasks');
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).send("Internal Server Error");
    }
};



// ----------------------------------------------- Delete task
module.exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            console.log("Task not found");
            return res.status(404).send("Task not found");
        }
        console.log("Task deleted successfully:", task);
        return res.redirect('/viewTasks');
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).send("Internal Server Error");
    }
}


// ----------------------------------------------- Open project form
module.exports.openProjectForm = async (req, res) => {
    try {
        const userId = req.user.id;
        const projects = await Project.find({ user: userId });
        res.render('admin/project', { projects: projects, user: req.user });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).send("Internal Server Error");
    }
};


// ----------------------------------------------- Create project
module.exports.createProject = async (req, res) => {
    const { title } = req.body;
    try {
        const newProject = await Project.create({ title, user: req.user.id });
        console.log("Project created successfully:", newProject);
        return res.redirect('/project');
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).send("Internal Server Error");
    }
};

// ----------------------------------------------- Delete project
module.exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            console.log("Project not found");
            return res.status(404).send("Project not found");
        }
        console.log("Project deleted successfully:", project);
        return res.redirect('/project');
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).send("Internal Server Error");
    }
};


// ----------------------------------------------- Logout user
module.exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    console.log("User logged out successfully");
    return res.redirect('/loginForm');
}