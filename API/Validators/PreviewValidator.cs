using API.Models;
using FluentValidation;

namespace API.Validators;

public class PreviewValidator : AbstractValidator<CodePreviewRequest>
{
    public PreviewValidator()
    {
        RuleFor(x => x.Code).SetValidator(new CodeValidator());
        RuleFor(x => x.Theme).MaximumLength(32);
    }
}