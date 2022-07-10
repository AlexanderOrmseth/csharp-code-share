using API.Models;
using FluentValidation;

namespace API.Validators;

public class RequestPreviewValidator : AbstractValidator<RequestPreview>
{
    public RequestPreviewValidator()
    {
        RuleFor(x => x.Code).NotNull().NotEmpty().MinimumLength(10).MaximumLength(9000);
        RuleFor(x => x.Theme).MaximumLength(32);
    }
}