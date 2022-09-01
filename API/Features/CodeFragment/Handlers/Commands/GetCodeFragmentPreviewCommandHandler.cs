using API.Features.CodeFragment.Requests.Commands;
using API.Helpers;
using API.Models;
using API.Validators;
using MediatR;

namespace API.Features.CodeFragment.Handlers.Commands;

public class
    GetCodeFragmentPreviewCommandHandler : IRequestHandler<GetCodeFragmentPreviewCommand, Response<GeneratedHtml>>
{
    public async Task<Response<GeneratedHtml>> Handle(GetCodeFragmentPreviewCommand request,
        CancellationToken cancellationToken)
    {
        var validator = new PreviewValidator();
        var response = new Response<GeneratedHtml>();

        // fluentValidation
        var validationResult = await validator.ValidateAsync(request.CodePreviewRequest, cancellationToken);

        if (validationResult.IsValid == false)
        {
            response.AddValidationErrors(validationResult);
            return response;
        }

        var htmlGenerator = new HtmlGenerator(request.CodePreviewRequest.Code, request.CodePreviewRequest.Theme);
        response.Data = new GeneratedHtml
        {
            Html = htmlGenerator.Html,
            LinesOfCode = htmlGenerator.LinesOfCode
        };

        return response;
    }
}