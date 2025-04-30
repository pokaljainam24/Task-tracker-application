const { Router } = require("express");
const adminRouter = Router();
const adminController = require("../controller/adminController");
const authMiddleware = require("../middleware/jwtAuthMiddleware");


// ----------------------------------------------- Open register page
adminRouter.get('/registerForm', adminController.openRegisterPage);
adminRouter.post('/registerForm', adminController.registerUser);


// ------------------------------------------------Register user
adminRouter.get('/loginForm', adminController.openloginPage);
adminRouter.post('/loginForm', adminController.loginUser);

// ------------------------------------------------Home page
adminRouter.get('/', authMiddleware, adminController.OpenhomePage);

// ----------------------------------------------- Open project page
adminRouter.get('/project', authMiddleware, adminController.openProjectForm);
adminRouter.post('/project', authMiddleware, adminController.createProject);


// ----------------------------------------------- Create Tasks user
adminRouter.get('/taskForm', authMiddleware, adminController.opentaskForm);
adminRouter.post('/taskForm', authMiddleware, adminController.createTask);


// ----------------------------------------------- View Tasks user
adminRouter.get('/viewTasks', authMiddleware, adminController.viewTasks);


// ----------------------------------------------- View Task by ID user and edit task
adminRouter.get('/editTaskForm/:id', authMiddleware,adminController.openEditTaskForm);
adminRouter.post('/editTaskForm/:id', authMiddleware, adminController.updateTask);


// ----------------------------------------------- Delete Task user
adminRouter.get('/deleteTask/:id', authMiddleware, adminController.deleteTask);
adminRouter.get('/deleteProject/:id', authMiddleware, adminController.deleteProject);


// ----------------------------------------------- Logout user
adminRouter.get('/logout', authMiddleware, adminController.logoutUser);


module.exports = adminRouter;
