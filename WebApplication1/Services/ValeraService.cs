using WebApplication1.Models;
using WebApplication1.Data;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Services
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

        public async Task<Valera> CreateValeraAsync()
        {
            var valera = new Valera();
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
    }
}
