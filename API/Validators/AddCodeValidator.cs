using API.DTOs;
using FluentValidation;

namespace API.Validators;

public class AddCodeValidator : AbstractValidator<AddCodeFragmentDto>
{
    public AddCodeValidator()
    {
        RuleFor(x => x.Code).SetValidator(new CodeValidator());
        RuleFor(x => x.Title).MaximumLength(32);
        RuleFor(x => x.Author).MaximumLength(32);
    }
}