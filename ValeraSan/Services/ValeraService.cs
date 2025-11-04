using ValeraSan.DTOs;
using ValeraSan.Models;
using ValeraSan.Data;
using Microsoft.EntityFrameworkCore;

namespace ValeraSan.Services
{
    public class ValeraService
    {
        private readonly AppDbContext _context;

        public ValeraService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Valera?> GetValeraAsync(int id)
        {
            return await _context.Valeras.FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task<Valera> CreateValeraAsync(CreateRequest req)
        {
            var name = req.Name;
            var state = req.State;
            var valera = new Valera(name, state.Health, state.Mana, state.Happiness, state.Tiredness, state.Money);
            _context.Valeras.Add(valera);
            await _context.SaveChangesAsync();
            return valera;
        }

        public async Task<bool> UpdateValeraAsync(Valera valera)
        {
            _context.Valeras.Update(valera);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteValeraAsync(int id)
        {
            var v = await _context.Valeras.FindAsync(id);
            if (v == null) return false;

            _context.Valeras.Remove(v);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<(Valera, bool)> GoWorkAsync(Valera valera)
        {
            var ok = valera.GoWork();
            _context.Valeras.Update(valera);
            await _context.SaveChangesAsync();
            return (valera, ok);
        }

        public async Task<Valera> LookForNatureAsync(Valera valera)
        {
            valera.LookForNature();
            _context.Valeras.Update(valera);
            await _context.SaveChangesAsync();
            return valera;
        }
        public async Task<Valera> DrinkWineAndWatchTVAsync(Valera valera)
        {
            valera.DrinkWineAndWatchTV();
            _context.Valeras.Update(valera);
            await _context.SaveChangesAsync();
            return valera;
        }

        public async Task<Valera> GoToBarAsync(Valera valera)
        {
            valera.GoToBar();
            _context.Valeras.Update(valera);
            await _context.SaveChangesAsync();
            return valera;
        }

        public async Task<Valera> DrinkWithMarginalsAsync(Valera valera)
        {
            valera.DrinkWithMarginals();
            _context.Valeras.Update(valera);
            await _context.SaveChangesAsync();
            return valera;
        }

        public async Task<Valera> SingInSubwayAsync(Valera valera)
        {
            valera.SingInSubway();
            _context.Valeras.Update(valera);
            await _context.SaveChangesAsync();
            return valera;
        }

        public async Task<Valera> SleepAsync(Valera valera)
        {
            valera.Sleep();
            _context.Valeras.Update(valera);
            await _context.SaveChangesAsync();
            return valera;
        }
    }
}
