/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ParkingProject.Database;
using ParkingProject.Models;

namespace ParkingProject.Hubs
{
    public class RoomHub : Hub
    {
        private readonly ApplicationContext _context;

        public RoomHub(ApplicationContext context)
        {

            _context = context;
        }

        public override async Task OnConnectedAsync()
        {
            var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = _context.Users.FirstOrDefault(e => e.Id.ToString() == userId);
            // await base.OnConnectedAsync();
            RoomConnection roomConnection = new RoomConnection()
            {
                ConnectionId = Context.ConnectionId,
                UserId = user.Id != null ? user.Id : null,
                User = user != null ? user : null

            };
            await _context.RoomConnections.AddAsync(roomConnection);
            await _context.SaveChangesAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            RoomConnection roomConnection = _context.RoomConnections.Include(e => e.User)
              .Include(e => e.Room).FirstOrDefault(e => e.ConnectionId == Context.ConnectionId);
            var room = _context.Rooms.FirstOrDefault(e => e.Id == roomConnection.Room.Id);
            if (roomConnection.Room != null)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, room.Id.ToString());
                _context.RoomConnections.Remove(roomConnection);
                _context.SaveChanges();
                Console.WriteLine($"{userId} has left from {room.Id}");
                SendUsersConnected(room.Id.ToString());
            }
            //  return  base.OnDisconnectedAsync(exception);
        }

        public async Task SetVideo(Database.Video video)
        {
            var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var roomId = _context.RoomConnections.FirstOrDefault(e => e.UserId.ToString() == userId).RoomId;
            var room = _context.Rooms.FirstOrDefault(e => e.Id == roomId);
            room.ActiveVideo = video;
            _context.Update(room);
            await _context.SaveChangesAsync();
            await Clients.Group(roomId.ToString()).SendAsync("SetVideo", video);
        }

        public async Task Play(ParkingState state)
        {
            var roomId = _context.RoomConnections.FirstOrDefault(e => e.ConnectionId == Context.ConnectionId).RoomId;
            await Clients.Group(roomId.ToString()).SendAsync("Play", state);
        }

        public async Task Pause(ParkingState state)
        {

            var roomId = _context.RoomConnections.FirstOrDefault(e => e.ConnectionId == Context.ConnectionId).RoomId;

            if (state.Play == true && state.Pause == false)
            {
                state.Play = false;
                state.Pause = true;
                await Clients.Group(roomId.ToString()).SendAsync("Pause", state);
            }
        }

        public async Task JoinRoom(string roomId)

        {
            var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var userName = Context.User.Claims.ToList()[0].Value;


            Room room = _context.Rooms.Include(e => e.ActiveVideo).Include(e => e.RoomConnections)
                .FirstOrDefault(r => r.Id.ToString() == roomId);
            User user = _context.Users.FirstOrDefault(r => r.Id.ToString() == userId);



            RoomConnection rM = new RoomConnection()
            {
                ConnectionId = Context.ConnectionId,
                Room = room,
                RoomId = room.Id,
                User = user,
                UserId = user.Id
            };
           
            if (room.RoomConnections == null)
            {
                room.RoomConnections = new List<RoomConnection>();
                room.RoomConnections.Add(rM);


            }
            else
            {
                room.RoomConnections.Add(rM);

            }
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId.ToString());
            _context.RoomConnections.Update(rM);
            if (room.ActiveVideo != null)
            {
                await Clients.Group(roomId.ToString()).SendAsync("SetVideo", room.ActiveVideo);
            }


            Console.WriteLine($"{userId} has joined {roomId}");
            // await Clients.Group(roomId.ToString()).SendAsync("UserJoined", roomId);
            await _context.SaveChangesAsync();
            SendUsersConnected(roomId.ToString());

        }

        *//* public async Task SendMessage(string message)
         {
             if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
             {
                 await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
                 Console.WriteLine($"{userConnection.User} write  \'{message}\'");
             }
         }*//*

        public async void SendUsersConnected(string roomId)
        {
            var usersConnectionRoom = _context.Rooms.Where(room => room.Id.ToString() == roomId)
                .Select(e => e.RoomConnections).Select(e => e.Select(e => e.User)).ToList();
            var users = usersConnectionRoom.Select(e => e.Select(e => e.Email)).ToArray();
            await Clients.Group(roomId).SendAsync("UsersInRoom", users);
        }
    }
}*/