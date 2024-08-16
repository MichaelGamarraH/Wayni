using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WayniPrueba.Data.Services;
using WayniPrueba.Data.ViewModel;

namespace WayniPrueba.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("get-all-users")]
        public IActionResult GetAllUsers()
        {
            var allUsers = _userService.GetAllUsers();
            return Ok(allUsers);
        }

        [HttpGet("get-user-by-id/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userService.GetUserById(id);
            return Ok(user);
        }

        [HttpPost("add-user")]
        public IActionResult AddUser([FromBody] UserVM user)
        {
            _userService.AddUser(user);
            return Ok();
        }

        [HttpPut("update-user-by-id/{id}")]
        public IActionResult UpdateUser(int id,UserVM user)
        {
            var updatedUser = _userService.UpdateUserById(id,user);
            return Ok(updatedUser);
        }

        [HttpDelete("delete-user-by-id/{id}")]
        public IActionResult DeleteUser(int id)
        {
            _userService.DeleteUserById(id);
            return Ok();
        }

    }
}
