using API.DTOs;
using API.Models;
using MediatR;

namespace API.Features.CodeFragment.Requests.Commands;

public record AddCodeFragmentCommand(AddCodeFragmentDto AddCodeFragmentDto) : IRequest<Response<Guid>>;