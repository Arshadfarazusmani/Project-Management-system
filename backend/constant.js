export const userRoleEnums = {

    ADMIN : "Admin",
    PROJECT_ADMIN: "Project_admin",
    MEMBER : "Member"
    
};

export const available_User_Roles = Object.values(userRoleEnums) ;

export const Task_Status_Enums = {
    TODO : "Todo",
    IN_PROGRESS :"In_progress",
    DONE : "Done"
}

export const availablt_Task_status_values= Object.values(Task_Status_Enums)


export const db_name = "Project_management_system_db"