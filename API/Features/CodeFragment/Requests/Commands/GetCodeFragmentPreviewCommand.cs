using API.Models;
using MediatR;

namespace API.Features.CodeFragment.Requests.Commands;

public record GetCodeFragmentPreviewCommand(CodePreviewRequest CodePreviewRequest) : IRequest<Response<GeneratedHtml>>;