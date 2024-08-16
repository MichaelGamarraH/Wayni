using WayniPrueba.Data.Models;
using WayniPrueba.Data.ViewModel;

namespace WayniPrueba.Data.Services
{
    public class UserService
    {
        private AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public void AddUser(UserVM user)
        {
            var _user = new User()
            {
                Name = user.Name,
                UserName = user.UserName,
                Password = user.Password,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            };
            _context.Users.Add(_user);
            _context.SaveChanges();
        }

        public List<User> GetAllUsers() => _context.Users.ToList();

        public User GetUserById(int userId) => _context.Users.FirstOrDefault(u => u.Id == userId);

        public User UpdateUserById(int userId, UserVM user)
        {
            var _user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if(_user != null) {
                _user.Name = user.Name;
                _user.UserName = user.UserName;
                _user.Password = user.Password;
                _user.Email = user.Email;
                _user.PhoneNumber = user.PhoneNumber;

                _context.SaveChanges();
            }
            return _user;
        }

        public void DeleteUserById(int userId)
        {
            var _user = _context.Users.FirstOrDefault(u=>u.Id == userId);
            if(_user != null)
            {
                _context.Users.Remove(_user);
                _context.SaveChanges();
            }
        }

    }
}
