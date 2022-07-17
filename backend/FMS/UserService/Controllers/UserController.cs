﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FMS.Entities;
using FMS.DataLayer;

namespace UserService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static UserDAO userDao;
        public UserController()
        {
            userDao= new UserDAO();
           
        }
        [Route("adduser")]
        [HttpPost]
        public IActionResult AddUser(User user)
        {
            try
            {
                userDao.AddUser(user);
                return StatusCode(200);
            }
            catch (Exception e)
            {

                return StatusCode(500, e.Message);
            }
        }
        [Route("checkadmin")]
        [HttpPost]
        public IActionResult CheckAdmin(User user)
        {
            try
            {
                bool response = userDao.CheckAdmin(user);
                return StatusCode(200, response);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            } 
        }
    }
}
