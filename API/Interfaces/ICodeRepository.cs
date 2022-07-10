using API.Entities;

namespace API.Interfaces;

public interface ICodeRepository
{
    Task<bool> AddCodeAndSave(CodeFragment userCode);

    Task<CodeFragment?> GetCodeById(Guid id);

    Task<bool> DeleteOldCodeFragments(CancellationToken cancellationToken);
}