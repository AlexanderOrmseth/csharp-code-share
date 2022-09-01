using API.Entities;

namespace API.Interfaces;

public interface ICodeRepository
{
    Task<Guid> AddCodeAndSave(CodeFragment userCode);

    Task<CodeFragment?> GetCodeById(Guid id);

    Task<bool> DeleteOldCodeFragments(CancellationToken cancellationToken);
}