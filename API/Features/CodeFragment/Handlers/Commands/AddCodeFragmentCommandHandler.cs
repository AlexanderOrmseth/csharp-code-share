using API.Features.CodeFragment.Requests.Commands;
using API.Interfaces;
using API.Models;
using API.Validators;
using MediatR;

namespace API.Features.CodeFragment.Handlers.Commands;

public class AddCodeFragmentCommandHandler : IRequestHandler<AddCodeFragmentCommand, Response<Guid>>
{
    private readonly ICodeRepository _codeRepository;

    public AddCodeFragmentCommandHandler(ICodeRepository codeRepository)
    {
        _codeRepository = codeRepository;
    }

    public async Task<Response<Guid>> Handle(AddCodeFragmentCommand request, CancellationToken cancellationToken)
    {
        var validator = new AddCodeValidator();
        var response = new Response<Guid>();

        // fluentValidation
        var validationResult = await validator.ValidateAsync(request.AddCodeFragmentDto, cancellationToken);

        if (validationResult.IsValid == false)
        {
            response.AddValidationErrors(validationResult);
            return response;
        }

        var newCodeFragment = new Entities.CodeFragment
        {
            Title = request.AddCodeFragmentDto.Title,
            Author = request.AddCodeFragmentDto.Author,
            Code = request.AddCodeFragmentDto.Code,
            CreatedAt = DateTime.UtcNow
        };

        response.Data = await _codeRepository.AddCodeAndSave(newCodeFragment);
        return response;
    }
}