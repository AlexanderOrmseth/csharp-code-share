using API.Context;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class CodeRepository : ICodeRepository
{
    private readonly MyDbContext _context;

    public CodeRepository(MyDbContext context)
    {
        _context = context;
    }

    public async Task<bool> AddCodeAndSave(CodeFragment codeFragment)
    {
        _context.CodeFragments.Add(codeFragment);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<CodeFragment?> GetCodeById(Guid id)
    {
        return await _context.CodeFragments.FindAsync(id);
    }

    public async Task<bool> DeleteOldCodeFragments(CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var codeToRemove = await _context.CodeFragments.Where(x => now.AddHours(-6) > x.CreatedAt)
            .ToListAsync(cancellationToken);

        // no items to delete -> false
        if (!codeToRemove.Any()) return false;

        _context.RemoveRange(codeToRemove);
        return await _context.SaveChangesAsync(cancellationToken) > 0;
    }
}