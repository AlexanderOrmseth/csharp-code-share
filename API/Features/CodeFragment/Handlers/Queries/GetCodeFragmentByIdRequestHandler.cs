using API.DTOs;
using API.Features.CodeFragment.Requests.Queries;
using API.Helpers;
using API.Interfaces;
using API.Models;
using MediatR;

namespace API.Features.CodeFragment.Handlers.Queries;

public class GetCodeFragmentByIdRequestHandler : IRequestHandler<GetCodeFragmentByIdRequest, Response<CodeFragmentDto>>
{
    private readonly ICodeRepository _codeRepository;

    public GetCodeFragmentByIdRequestHandler(ICodeRepository codeRepository)
    {
        _codeRepository = codeRepository;
    }

    public async Task<Response<CodeFragmentDto>> Handle(GetCodeFragmentByIdRequest request,
        CancellationToken cancellationToken)
    {
        var response = new Response<CodeFragmentDto>();

        // validate guid
        if (!Guid.TryParse(request.Id, out var validId))
        {
            response.AddError($"Error! '{request.Id}' is not a valid ID!");
            return response;
        }

        var codeFragment = await _codeRepository.GetCodeById(validId);

        if (codeFragment is null)
        {
            response.AddNotFoundError($"Code-fragment with id '{request.Id}' does not exist.");
            return response;
        }

        var generateHtml = new HtmlGenerator(codeFragment.Code, request.Theme);

        response.Data = new CodeFragmentDto
        {
            Id = codeFragment.Id,
            Title = codeFragment.Title,
            Author = codeFragment.Author,
            Code = generateHtml.Html,
            CodeString = codeFragment.Code,
            CreatedAt = codeFragment.CreatedAt,
            LinesOfCode = generateHtml.LinesOfCode
        };

        return response;
    }
}