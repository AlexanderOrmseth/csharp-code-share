using API.DTOs;
using API.Models;
using MediatR;

namespace API.Features.CodeFragment.Requests.Queries;

public class GetCodeFragmentByIdRequest : IRequest<Response<CodeFragmentDto>>
{
    public GetCodeFragmentByIdRequest(string id, string? theme)
    {
        Id = id;
        Theme = theme;
    }

    public string Id { get; }
    public string? Theme { get; }
}